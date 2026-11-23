import jwt from 'jsonwebtoken';

// Express middleware: only lets a request through if it carries a valid login token.
// The frontend sends:  Authorization: Bearer <token>
// On success, req.user = { id, username } (the payload we put in the token at login).
export function requireAuth(req, res, next) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Login required' });

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
}
