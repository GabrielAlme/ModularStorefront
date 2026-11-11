import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {

    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Not Signed In" });
    }

    try {
        req.user = jwt.verify(header.slice(7), process.env.SECRET_KEY);
        next();
    } catch (err) {
        console.error("Require Auth:", err.message)
        res.status(401).json({ error: "Invalid or expired token" });
    }
}