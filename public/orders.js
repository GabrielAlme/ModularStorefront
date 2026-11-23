import { Router } from 'express';
import Stripe from 'stripe';
import pool from '../db.js';

// Checkout and orders, with Stripe handling the payment so card numbers never touch our server.
//
// How it works:
//   1. POST /api/orders/checkout  -> we build a pending order from the cart (prices come from the
//      DATABASE, never from the browser), ask Stripe for a checkout page, and send the URL back.
//   2. The browser goes to that Stripe page and the customer pays there.
//   3. Stripe calls POST /api/orders/webhook -> we mark the order paid and reduce the stock.
//   4. GET /api/orders -> the logged-in user's orders.
//
// Uses the existing orders, order_items and billing tables.

const router = Router();

class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

// Created on first use, so the server still starts if the Stripe key isn't set yet.
let stripe;
function getStripe() {
    if (!process.env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is not set in .env');
    stripe ??= new Stripe(process.env.STRIPE_SECRET_KEY);
    return stripe;
}

// Turns the cart from the browser into a Map of product_id -> quantity, or throws a 400.
function cleanItems(items) {
    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
        throw new HttpError(400, 'Your cart must contain 1 to 50 items');
    }
    const wanted = new Map();
    for (const item of items) {
        const productId = Number(item?.product_id);
        const quantity = Number(item?.quantity);
        if (!Number.isInteger(productId) || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
            throw new HttpError(400, 'Each item needs a product_id and a quantity from 1 to 99');
        }
        wanted.set(productId, (wanted.get(productId) || 0) + quantity);
    }
    return wanted;
}

// Checks stock and prices against the database and saves a 'pending' order, all or nothing.
async function createPendingOrder(userId, wanted) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const { rows: products } = await client.query(
            'SELECT product_id, store_id, product_name, price, inventory_count FROM products WHERE product_id = ANY($1::int[])',
            [[...wanted.keys()]]
        );
        if (products.length !== wanted.size) throw new HttpError(404, 'One of the products in your cart no longer exists');
        if (new Set(products.map((p) => p.store_id)).size > 1) throw new HttpError(400, 'Please check out one store at a time');

        const lines = products.map((p) => {
            const quantity = wanted.get(p.product_id);
            if (p.inventory_count < quantity) throw new HttpError(409, `Not enough stock for ${p.product_name}`);
            return { product_id: p.product_id, name: p.product_name, quantity, unit_cents: Math.round(Number(p.price) * 100) };
        });
        const totalCents = lines.reduce((sum, l) => sum + l.unit_cents * l.quantity, 0);

        const { rows: [order] } = await client.query(
            'INSERT INTO orders (user_id, store_id, status, total_amount) VALUES ($1, $2, $3, $4) RETURNING order_id',
            [userId, products[0].store_id, 'pending', (totalCents / 100).toFixed(2)]
        );
        for (const l of lines) {
            await client.query(
                'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4)',
                [order.order_id, l.product_id, l.quantity, (l.unit_cents / 100).toFixed(2)]
            );
        }

        await client.query('COMMIT');
        return { orderId: order.order_id, lines };
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

// POST /api/orders/checkout   body: { items: [{ product_id, quantity }, ...] }   -> { url, order_id }
router.post('/checkout', async (req, res) => {
    let order;
    try {
        order = await createPendingOrder(req.user.id, cleanItems(req.body?.items));
    } catch (err) {
        if (err instanceof HttpError) return res.status(err.status).json({ error: err.message });
        throw err;
    }

    // Where Stripe sends the customer back to. On Heroku, set CLIENT_URL to the site's address.
    const base = process.env.CLIENT_URL || 'http://localhost:5173';

    let session;
    try {
        session = await getStripe().checkout.sessions.create({
            mode: 'payment',
            line_items: order.lines.map((l) => ({
                quantity: l.quantity,
                price_data: { currency: 'usd', unit_amount: l.unit_cents, product_data: { name: l.name } },
            })),
            client_reference_id: String(order.orderId),
            metadata: { order_id: String(order.orderId) },
            success_url: `${base}/Cart?checkout=success`,
            cancel_url: `${base}/Cart?checkout=cancelled`,
        });
    } catch (err) {
        await pool.query("UPDATE orders SET status = 'cancelled' WHERE order_id = $1", [order.orderId]);
        throw err;
    }

    await pool.query(
        "INSERT INTO billing (order_id, payment_status, payment_method, transaction_reference) VALUES ($1, 'pending', 'stripe', $2)",
        [order.orderId, session.id]
    );
    res.status(201).json({ url: session.url, order_id: order.orderId });
});

// GET /api/orders   the logged-in user's orders, newest first, with their items
router.get('/', async (req, res) => {
    const { rows } = await pool.query(
        `SELECT o.order_id, o.store_id, o.status, o.total_amount, o.created_at,
                COALESCE(
                    json_agg(json_build_object(
                        'product_id', oi.product_id,
                        'product_name', p.product_name,
                        'quantity', oi.quantity,
                        'unit_price', oi.unit_price
                    )) FILTER (WHERE oi.order_item_id IS NOT NULL),
                    '[]'
                ) AS items
         FROM orders o
         LEFT JOIN order_items oi ON oi.order_id = o.order_id
         LEFT JOIN products p ON p.product_id = oi.product_id
         WHERE o.user_id = $1
         GROUP BY o.order_id
         ORDER BY o.created_at DESC`,
        [req.user.id]
    );
    res.json(rows);
});

async function markPaid(orderId, session) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        // Only a still-pending order changes. Stripe can send the same event twice, and this
        // makes sure the stock is only reduced once.
        const { rows } = await client.query(
            "UPDATE orders SET status = 'paid' WHERE order_id = $1 AND status = 'pending' RETURNING order_id",
            [orderId]
        );
        if (rows.length > 0) {
            await client.query(
                `UPDATE products p
                 SET inventory_count = GREATEST(p.inventory_count - oi.quantity, 0)
                 FROM order_items oi
                 WHERE oi.order_id = $1 AND oi.product_id = p.product_id`,
                [orderId]
            );
            await client.query(
                "UPDATE billing SET payment_status = 'paid', transaction_reference = $2 WHERE order_id = $1",
                [orderId, session.payment_intent ?? session.id]
            );
        }
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

async function markCancelled(orderId) {
    await pool.query("UPDATE orders SET status = 'cancelled' WHERE order_id = $1 AND status = 'pending'", [orderId]);
    await pool.query("UPDATE billing SET payment_status = 'cancelled' WHERE order_id = $1 AND payment_status = 'pending'", [orderId]);
}

// POST /api/orders/webhook   called by Stripe, not by the browser.
// It needs the RAW request body to check Stripe's signature, so server.js mounts it BEFORE
// express.json(). Don't move it into the router above.
export async function stripeWebhook(req, res) {
    let event;
    try {
        event = getStripe().webhooks.constructEvent(
            req.body,
            req.headers['stripe-signature'],
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Stripe webhook signature check failed:', err.message);
        return res.status(400).send('Invalid signature');
    }

    const session = event.data.object;
    const orderId = Number(session.metadata?.order_id);
    if (Number.isInteger(orderId)) {
        const paidEvents = ['checkout.session.completed', 'checkout.session.async_payment_succeeded'];
        const failedEvents = ['checkout.session.expired', 'checkout.session.async_payment_failed'];
        if (paidEvents.includes(event.type) && session.payment_status === 'paid') {
            await markPaid(orderId, session);
        } else if (failedEvents.includes(event.type)) {
            await markCancelled(orderId);
        }
    }
    res.json({ received: true });
}

export default router;
