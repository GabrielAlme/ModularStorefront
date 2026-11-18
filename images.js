import express, { Router } from 'express';
import pool from '../db.js';
import { requireAuth } from '../auth.js';

// Lets a logged-in user upload images from their own computer. The images are stored in the
// database (Heroku wipes files saved on disk), so they are saved along with the rest of the site.
// Mounted at /api/images in server.js.

const router = Router();

const MAX_BYTES = 2 * 1024 * 1024; // 2 MB per image
const MAX_IMAGES_PER_USER = 50;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

// Looks at the first bytes of the file so a file can't just claim to be an image.
// (SVG is left out on purpose, SVG files can carry scripts.)
export function detectType(buf) {
    if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png';
    if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
    if (buf.length >= 6 && ['GIF87a', 'GIF89a'].includes(buf.subarray(0, 6).toString('latin1'))) return 'image/gif';
    if (buf.length >= 12 && buf.subarray(0, 4).toString('latin1') === 'RIFF' && buf.subarray(8, 12).toString('latin1') === 'WEBP') return 'image/webp';
    return null;
}

// POST /api/images   body = the raw image file, header Content-Type = the file's type
router.post('/', requireAuth, express.raw({ type: ALLOWED_TYPES, limit: MAX_BYTES }), async (req, res) => {
    if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
        return res.status(415).json({ error: 'Send a PNG, JPG, GIF or WebP image' });
    }
    const contentType = detectType(req.body);
    if (!contentType) return res.status(400).json({ error: 'That file is not a valid image' });

    const { rows: [{ count }] } = await pool.query('SELECT COUNT(*)::int AS count FROM images WHERE user_id = $1', [req.user.id]);
    if (count >= MAX_IMAGES_PER_USER) {
        return res.status(409).json({ error: `Image limit reached (${MAX_IMAGES_PER_USER}). Delete one first.` });
    }

    let filename = 'image';
    try { filename = decodeURIComponent(req.get('x-filename') || 'image'); } catch { /* keep the default name */ }
    filename = filename.slice(0, 255);

    const { rows } = await pool.query(
        `INSERT INTO images (user_id, content_type, filename, data)
         VALUES ($1, $2, $3, $4)
         RETURNING image_id, filename, content_type, octet_length(data) AS size`,
        [req.user.id, contentType, filename, req.body]
    );
    res.status(201).json(rows[0]);
});

// GET /api/images/mine   the logged-in user's images (without the image bytes)
// (this has to stay above /:id)
router.get('/mine', requireAuth, async (req, res) => {
    const { rows } = await pool.query(
        `SELECT image_id, filename, content_type, octet_length(data) AS size, created_at
         FROM images WHERE user_id = $1 ORDER BY created_at DESC`,
        [req.user.id]
    );
    res.json(rows);
});

// GET /api/images/:id   public on purpose, so visitors can see the images on a site
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.sendStatus(404);
    const { rows } = await pool.query('SELECT content_type, data FROM images WHERE image_id = $1', [id]);
    if (rows.length === 0) return res.sendStatus(404);
    res.set({
        'Content-Type': rows[0].content_type,
        'Cache-Control': 'public, max-age=86400',
        'X-Content-Type-Options': 'nosniff',
    });
    res.send(rows[0].data);
});

// DELETE /api/images/:id   only the owner can delete
router.delete('/:id', requireAuth, async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.sendStatus(404);
    const { rowCount } = await pool.query('DELETE FROM images WHERE image_id = $1 AND user_id = $2', [id, req.user.id]);
    res.sendStatus(rowCount ? 204 : 404);
});

// Friendly message when an image is over the size limit
router.use((err, req, res, next) => {
    if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Image is too large (2 MB maximum)' });
    next(err);
});

export default router;
