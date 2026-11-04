import { Router } from 'express';
import pool from './db.js';
import storesRouter from './routes/stores.js';
import productsRouter from './routes/products.js';
import layoutsRouter from './routes/layouts.js';
import { createUser, loginUser } from './userQueries.js';

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

//Post method for the signup page
api.post("/signup", async (req, res) => {
    const { username, email, password } = req.body

    //Server side validation for security
    if(!username || !email || !password) {
        return res.status(400).json({error: "All fields are required" });
    }
    
    try {
        const user = await createUser({ username, email, password });
        res.status(201).json(user);
    } catch (error) {
        if (error.message === "Email Already Registered" || error.message === "Username already taken") {
            return res.status(409).json({ error: error.message });
        }
        res.status(500).json({error: "Something went wrong"});
    }
});

//Post method for the login page
api.post("/login", async (req, res) => {
    const {email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        if (!user) return res.status(401).json({error: "Invalid email or password" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Any /api path that doesn't exist returns JSON instead of the React page
api.use((req, res) => res.status(404).json({ error: 'not found' }));

export default api;
