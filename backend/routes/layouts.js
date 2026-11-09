import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Both routes sit behind requireAuth (see api.js), so req.user.id is the logged-in user.
// A user can only ever read or write their OWN layout.

// GET /api/layouts  -> { layout }
router.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT layout FROM stores WHERE owner_id = $1",
            [req.params.userId]
        );
        if (rows.length === 0) return res.status(404).json({ error: "User not found" });
        res.json({ layout: rows[0].layout });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load layout" });
    }
});

// PUT /api/layouts  body: the workspace object
router.put("/", async (req, res) => {
    if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) {
        return res.status(400).json({ error: "Layout must be an object" });
    }
    try {
        const { rowCount } = await pool.query(
            "UPDATE layout SET layout = $1 WHERE owner_id = $2",
            [JSON.stringify(req.body), req.params.userId]
        );
        if (rowCount === 0) return res.status(404).json({ error: "User not found" });
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save layout" });
    }
});

export default router;
