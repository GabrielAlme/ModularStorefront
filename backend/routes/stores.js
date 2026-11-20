import { Router } from 'express';
import pool from '../db.js';
import { requireAuth } from "../middleware/requireAuth.js";
import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from "obscenity";

const profanityMatcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

const router = Router();

// GET /api/stores
router.get('/', requireAuth, async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT store_id, slug, created_at FROM stores WHERE owner_id = $1 ORDER BY store_id',
            [req.user.id]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load stores" });
    }
});

// GET /api/stores/:id
// router.get('/:id', async (req, res) => {
//     const id = Number(req.params.id);
//     if (!Number.isInteger(id)) return res.status(400).json({ error: 'id must be a number' });

//     const { rows } = await pool.query(
//         'SELECT store_id, owner_id, slug, description, created_at FROM stores WHERE store_id = $1',
//         [id]
//     );
//     if (rows.length === 0) return res.status(404).json({ error: 'store not found' });
//     res.json(rows[0]);
// });

// POST /api/stores   body: { owner_id, slug, description? }
// router.post('/', async (req, res) => {
//     const { owner_id, slug } = req.body;
//     if (!Number.isInteger(owner_id) || !slug) {
//         return res.status(400).json({ error: 'owner_id (number) and slug are required' });
//     }

//     const { rows } = await pool.query(
//         'INSERT INTO stores (owner_id, slug ) VALUES ($1, $2, $3) RETURNING *',
//         [owner_id, slug ?? null]
//     );
//     res.status(201).json(rows[0]);
// });

//gets the layout from the store table
router.get("/me", requireAuth, async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT s.store_id, s.slug, s.layout FROM users u
             JOIN stores s ON s.owner_id = u.user_id AND s.store_id = u.active_store
             WHERE u.user_id = $1`,
            [req.user.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: "No active store" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load store" });
    }
});

//saves the layout to the stores table
router.put("/me/layout", requireAuth, async (req, res) => {
    try {
        const { rowCount } = await pool.query(
            `UPDATE stores SET layout = $1
             WHERE owner_id = $2
               AND store_id = (SELECT active_store FROM users WHERE user_id = $2)`,
            [JSON.stringify(req.body.layout), req.user.id]
        );

        if (rowCount === 0) {
            return res.status(400).json({ error: "Layout couldn't be found" });
        }

        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save Layout"});
    }
});


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

//lists functions and route for a user creating a store
const RESERVED = [
  "login", "logout", "signin", "signout", "signup", "register", "auth", "oauth",
  "account", "accounts", "password", "reset", "verify", "forgot", "session", "sessions",

  "workshop", "workspace", "projects", "project", "dashboard", "settings", "profile",
  "editor", "preview", "home", "index", "welcome", "onboarding", "active",

  "admin", "administrator", "root", "system", "sysadmin", "superuser", "moderator",
  "staff", "owner", "support", "official", "team",

  "api", "graphql", "static", "assets", "cdn", "public", "dist", "src", "build",
  "uploads", "upload", "files", "media", "images", "img", "css", "fonts",
  "favicon", "robots", "sitemap", "manifest", "health", "status", "metrics",
  "webhook", "webhooks", "cron", "socket",

  "www", "mail", "email", "smtp", "ftp", "dns", "localhost", "server", "host",
  "dev", "staging", "test", "testing", "demo", "sandbox", "beta", "alpha", "app", "apps",

  "store", "stores", "shop", "shops", "cart", "checkout", "order", "orders",
  "payment", "payments", "billing", "invoice", "invoices", "pricing", "plans",
  "subscribe", "subscription", "product", "products", "catalog", "category",
  "categories", "search", "explore", "discover", "browse", "marketplace",
  "new", "create", "edit", "delete", "manage",

  "about", "contact", "help", "faq", "docs", "documentation", "blog", "news",
  "press", "careers", "jobs", "terms", "tos", "privacy", "legal", "policy",
  "security", "cookies", "abuse", "report", "feedback",

  "windowshop", "window-shop", "gabedoeswebsites",

  "null", "undefined", "true", "false", "user", "users", "guest", "anonymous",
  "everyone", "all", "none", "default", "example", "sample",
];
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function validateSlug(raw) {
  const slug = String(raw ?? "").trim().toLowerCase();
  if (slug.length < 3 || slug.length > 50) return { error: "Name must be 3-50 characters" };
  if (!SLUG_PATTERN.test(slug)) return { error: "Please use lowercase letters, numbers, and dashes instead of spaces" };
  if (RESERVED.includes(slug)) return { error: "That name is reserved" };
  if (profanityMatcher.hasMatch(slug) || profanityMatcher.hasMatch(slug.replace(/-/g, ""))) {
    return { error: "That name isn't allowed" };
}
  return { slug };
}


router.post("/", requireAuth, async (req, res) => {
  const { slug, error } = validateSlug(req.body.slug);
  if (error) return res.status(400).json({ error });

  const ownerId = req.user.id;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO stores (owner_id, store_id, slug)
         SELECT $1::int, COALESCE(MAX(store_id), 0) + 1, $2::varchar
         FROM stores WHERE owner_id = $1::int
         RETURNING *`,
        [ownerId, slug]
      );
      await pool.query(
        "UPDATE users SET active_store = $1 WHERE user_id = $2 AND active_store IS NULL",
        [rows[0].store_id, ownerId]
      );
      return res.status(201).json(rows[0]);
    } catch (err) {
      if (err.code === "23505" && err.constraint === "stores_slug_key") {
        return res.status(409).json({ error: "That name is already taken" });
      }
      if (err.code === "23505" && err.constraint === "stores_pkey") continue;
      console.error(err);
      return res.status(500).json({ error: "Failed to create store" });
    }
  }
  res.status(500).json({ error: "Failed to create store" });
});

//route for updating the users active store
router.put("/:storeId/activate", requireAuth, async (req , res) => {
    try {
        const { rowCount } = await pool.query(
            `UPDATE users SET active_store = $1
            WHERE user_id = $2
            AND EXISTS (SELECT 1 FROM stores WHERE store_id = $1 AND owner_id = $2)`,
            [req.params.storeId, req.user.id]
        );
        if (rowCount === 0) return res.status(404).json({ error : "Store not found" });
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to switch store" });
    }
});



export default router;
