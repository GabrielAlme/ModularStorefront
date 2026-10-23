import express from 'express';
import fs from 'node:fs';
import pool from '../db.js';
import api from '../api.js';
import errorHandler from '../errorHandler.js';

// Tests WIPE the database they connect to. This refuses to run unless it is clearly a test database.
export function assertTestDatabase() {
    const name = process.env.DB_NAME || '';
    if (process.env.DATABASE_URL || !name.endsWith('_test')) {
        throw new Error(
            `Refusing to run tests: DB_NAME must end with "_test" (got "${name}") and DATABASE_URL must be unset. ` +
            'Tests delete everything in the database. Copy .env.test.example to .env.test.'
        );
    }
}

// Rebuilds the whole database from backend/db/schema.sql and inserts known fixture rows.
// Because it uses the real schema file, a broken schema.sql makes every test fail.
export async function resetDatabase() {
    assertTestDatabase();
    const schema = fs.readFileSync(new URL('../db/schema.sql', import.meta.url), 'utf8');
    await pool.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
    await pool.query(schema);
    await pool.query(`
        INSERT INTO users (username, email, password_hash) VALUES ('owner', 'owner@example.com', 'fake-hash');
        INSERT INTO stores (owner_id, store_name, description) VALUES (1, 'Test Store', 'A test store');
        INSERT INTO products (store_id, product_name, description, price, inventory_count)
        VALUES (1, 'Test Item', 'First product', 9.99, 10), (1, 'Other Item', 'Second product', 19.99, 5);
    `);
}

// Starts the API on a random free port so tests never collide with a running dev server.
export async function startServer() {
    const app = express();
    app.use(express.json());
    app.use('/api', api);
    app.use(errorHandler);

    const server = await new Promise(resolve => {
        const s = app.listen(0, () => resolve(s));
    });
    return {
        baseUrl: `http://localhost:${server.address().port}`,
        close: () => new Promise(resolve => server.close(resolve)),
    };
}

// Small wrapper so tests read cleanly: const { status, body } = await call(baseUrl, 'POST', '/api/stores', {...})
export async function call(baseUrl, method, path, json) {
    const res = await fetch(baseUrl + path, {
        method,
        headers: json ? { 'Content-Type': 'application/json' } : undefined,
        body: json ? JSON.stringify(json) : undefined,
    });
    return { status: res.status, body: await res.json() };
}

export { pool };
