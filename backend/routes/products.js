import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/products            all products
// GET /api/products?store_id=1 only one store's products
router.get('/', async (req, res) => {
    if (req.query.store_id !== undefined) {
        const storeId = Number(req.query.store_id);
        if (!Number.isInteger(storeId)) return res.status(400).json({ error: 'store_id must be a number' });

        const { rows } = await pool.query(
            'SELECT * FROM products WHERE store_id = $1 ORDER BY product_id',
            [storeId]
        );
        return res.json(rows);
    }
    
    const { rows } = await pool.query('SELECT * FROM products ORDER BY product_id');
    res.json(rows);
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'id must be a number' });

    const { rows } = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'product not found' });
    res.json(rows[0]);
});

// POST /api/products   body: { store_id, product_name, price, description?, inventory_count? }
router.post('/', async (req, res) => {
    const { store_id, product_name, price, description, inventory_count } = req.body;
    if (!Number.isInteger(store_id) || !product_name || typeof price !== 'number' || price < 0) {
        return res.status(400).json({ error: 'store_id (number), product_name and price (number) are required' });
    }

    const { rows } = await pool.query(
        `INSERT INTO products (store_id, product_name, description, price, inventory_count)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [store_id, product_name, description ?? null, price, inventory_count ?? 0]
    );
    res.status(201).json(rows[0]);
});

export default router;
