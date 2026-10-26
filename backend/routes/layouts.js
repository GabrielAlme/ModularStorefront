import { Router } from "express";
import pool from "../db.js";
import { RouterProvider } from "react-router-dom";

const router = Router();

router.get("/:userId", async (req, res) => {
    try{
        const { rows } = await pool.query(
            "SELECT layout FROM users WHERE id = $1",
            [req.params.userId]
        );
        if (rows.length === 0) return res.status(404).json({ error: "User not found"});
        res.json({ layout: rows[0].layout });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load layout" });
    }
})

export default router;