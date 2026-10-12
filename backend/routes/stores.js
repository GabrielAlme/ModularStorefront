import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/stores
router.get('/', async (req, res) => {
    const { rows } = await pool.query(
        'SELECT store_id, owner_id, store_name, description, created_at FROM stores ORDER BY store_id'
    );
    res.json(rows);
});

// GET /api/stores/:id
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'id must be a number' });

    const { rows } = await pool.query(
        'SELECT store_id, owner_id, store_name, description, created_at FROM stores WHERE store_id = $1',
        [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'store not found' });
    res.json(rows[0]);
});

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

export default router;
