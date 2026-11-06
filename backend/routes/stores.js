import { Router } from 'express';
import pool from '../db.js';
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

// GET /api/stores
router.get('/', async (req, res) => {
    const { rows } = await pool.query(
        'SELECT store_id, owner_id, store_name, description, created_at FROM stores ORDER BY store_id'
    );
    res.json(rows);
});

// GET /api/stores/:id
// router.get('/:id', async (req, res) => {
//     const id = Number(req.params.id);
//     if (!Number.isInteger(id)) return res.status(400).json({ error: 'id must be a number' });

//     const { rows } = await pool.query(
//         'SELECT store_id, owner_id, store_name, description, created_at FROM stores WHERE store_id = $1',
//         [id]
//     );
//     if (rows.length === 0) return res.status(404).json({ error: 'store not found' });
//     res.json(rows[0]);
// });

// POST /api/stores   body: { owner_id, store_name, description? }
router.post('/', async (req, res) => {
    const { owner_id, store_name, description } = req.body;
    if (!Number.isInteger(owner_id) || !store_name) {
        return res.status(400).json({ error: 'owner_id (number) and store_name are required' });
    }

    const { rows } = await pool.query(
        'INSERT INTO stores (owner_id, store_name, description) VALUES ($1, $2, $3) RETURNING *',
        [owner_id, store_name, description ?? null]
    );
    res.status(201).json(rows[0]);
});

//gets the layout from the store table
router.get("/me", requireAuth, async (req,res) => {
    try {
        const { rows } = await pool.query(
            "SELECT layout FROM stores WHERE owner_id = $1",
            [req.user.userId]
        );

        if(rows.length === 0) {
            return res.status(404).json({ error: "Layout could not be fetched" })
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load layout" });
    }
});

//saves the layout to the stores table



//gets the store from the stores table
router.get("/:slug", async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT store_id, slug, layout FROM stores WHERE slug = $1",
            [req.params.slug.toLowerCase()]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Store not found" });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load store" });
    }
})



export default router;
