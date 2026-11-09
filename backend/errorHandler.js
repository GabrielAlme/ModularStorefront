// Express error handler. Any error thrown inside a route ends up here.
export default function errorHandler(err, req, res, next) {
    if (err.code === '23503') return res.status(400).json({ error: 'referenced row does not exist' }); //postgres foreign key violation (expected, not logged)
    if (err.code === '23505') return res.status(409).json({ error: 'already exists' }); //postgres unique violation (expected, not logged)
    console.error(err); //anything else is a real problem, so log it
    res.status(500).json({ error: 'server error' });
}
