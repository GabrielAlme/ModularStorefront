import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import { resetDatabase, startServer, call, pool } from './helpers.js';

let server;

before(async () => {
    await resetDatabase();
    server = await startServer();
});

after(async () => {
    await server.close();
    await pool.end();
});

const get = path => call(server.baseUrl, 'GET', path);
const post = (path, json) => call(server.baseUrl, 'POST', path, json);

describe('health', () => {
    test('GET /api/health reaches the database', async () => {
        const { status, body } = await get('/api/health');
        assert.equal(status, 200);
        assert.deepEqual(body, { ok: true });
    });

    test('unknown /api path returns JSON 404, not the React page', async () => {
        const { status, body } = await get('/api/does-not-exist');
        assert.equal(status, 404);
        assert.equal(body.error, 'not found');
    });
});

describe('stores', () => {
    test('GET /api/stores lists stores with the fields the frontend expects', async () => {
        const { status, body } = await get('/api/stores');
        assert.equal(status, 200);
        assert.equal(body.length, 1);
        assert.deepEqual(
            Object.keys(body[0]).sort(),
            ['created_at', 'description', 'owner_id', 'store_id', 'store_name']
        );
    });

    test('GET /api/stores/:id returns one store', async () => {
        const { status, body } = await get('/api/stores/1');
        assert.equal(status, 200);
        assert.equal(body.store_name, 'Test Store');
    });

    test('GET /api/stores/:id returns 404 for a missing store', async () => {
        const { status } = await get('/api/stores/9999');
        assert.equal(status, 404);
    });

    test('GET /api/stores/:id returns 400 for a non-numeric id', async () => {
        const { status } = await get('/api/stores/abc');
        assert.equal(status, 400);
    });

    test('POST /api/stores creates a store that then shows up in the list', async () => {
        const created = await post('/api/stores', { owner_id: 1, store_name: 'Second Store' });
        assert.equal(created.status, 201);
        assert.equal(created.body.store_name, 'Second Store');

        const list = await get('/api/stores');
        assert.ok(list.body.some(s => s.store_id === created.body.store_id));
    });

    test('POST /api/stores rejects missing fields', async () => {
        const { status } = await post('/api/stores', {});
        assert.equal(status, 400);
    });

    test('POST /api/stores rejects an owner that does not exist', async () => {
        const { status } = await post('/api/stores', { owner_id: 9999, store_name: 'Orphan' });
        assert.equal(status, 400);
    });
});

describe('products', () => {
    test('GET /api/products lists products with the fields the frontend expects', async () => {
        const { status, body } = await get('/api/products');
        assert.equal(status, 200);
        assert.ok(body.length >= 2);
        assert.deepEqual(
            Object.keys(body[0]).sort(),
            ['created_at', 'description', 'inventory_count', 'price', 'product_id', 'product_name', 'store_id']
        );
    });

    test('prices come back as strings (Postgres NUMERIC), so the frontend must convert them', async () => {
        const { body } = await get('/api/products/1');
        assert.equal(body.price, '9.99');
    });

    test('GET /api/products?store_id= only returns that store\'s products', async () => {
        const store = await post('/api/stores', { owner_id: 1, store_name: 'Filter Store' });
        await post('/api/products', { store_id: store.body.store_id, product_name: 'Only Here', price: 1 });

        const { status, body } = await get(`/api/products?store_id=${store.body.store_id}`);
        assert.equal(status, 200);
        assert.equal(body.length, 1);
        assert.equal(body[0].product_name, 'Only Here');
    });

    test('GET /api/products?store_id=abc returns 400', async () => {
        const { status } = await get('/api/products?store_id=abc');
        assert.equal(status, 400);
    });

    test('GET /api/products/:id returns 404 for a missing product', async () => {
        const { status } = await get('/api/products/9999');
        assert.equal(status, 404);
    });

    test('POST /api/products creates a product and defaults inventory to 0', async () => {
        const { status, body } = await post('/api/products', { store_id: 1, product_name: 'New Thing', price: 4.5 });
        assert.equal(status, 201);
        assert.equal(body.price, '4.50');
        assert.equal(body.inventory_count, 0);
    });

    test('POST /api/products rejects a negative price', async () => {
        const { status } = await post('/api/products', { store_id: 1, product_name: 'Bad', price: -1 });
        assert.equal(status, 400);
    });

    test('POST /api/products rejects a store that does not exist', async () => {
        const { status } = await post('/api/products', { store_id: 9999, product_name: 'Bad', price: 1 });
        assert.equal(status, 400);
    });
});
