import { Router } from 'express';
import pool from './db.js';
import storesRouter from './routes/stores.js';
import productsRouter from './routes/products.js';
import layoutsRouter from './routes/products.js';

const api = Router();

// GET /api/health  -> confirms the server is up AND can reach the database
api.get('/health', async (req, res) => {
    await pool.query('SELECT 1');
    res.json({ ok: true });
});

// To add a new resource: make backend/routes/<name>.js and add one line here.
api.use('/stores', storesRouter);
api.use('/products', productsRouter);
api.use('/layouts', layoutsRouter);

// Any /api path that doesn't exist returns JSON instead of the React page
api.use((req, res) => res.status(404).json({ error: 'not found' }));

export default api;
