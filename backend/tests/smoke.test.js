// Read-only checks you can point at the REAL deployed site. It never creates or changes data.
//   SMOKE_URL=https://your-app.herokuapp.com npm run smoke
// Locally, run `npm run server` first and use SMOKE_URL=http://localhost:3000
// (add SMOKE_SKIP_FRONTEND=1 if you have not run `npm run build`).
import { test } from 'node:test';
import assert from 'node:assert/strict';

const base = (process.env.SMOKE_URL || 'http://localhost:3000').replace(/\/$/, '');

// 20s because a sleeping Heroku dyno can take a while to wake up on the first request
const fetchSite = path => fetch(base + path, { signal: AbortSignal.timeout(20000) });

test('API is up and can reach the database', async () => {
    const res = await fetchSite('/api/health');
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true });
});

test('GET /api/stores returns a list with the expected fields', async () => {
    const res = await fetchSite('/api/stores');
    assert.equal(res.status, 200);
    const stores = await res.json();
    assert.ok(Array.isArray(stores));
    if (stores.length > 0) {
        for (const key of ['store_id', 'owner_id', 'store_name', 'description', 'created_at']) {
            assert.ok(key in stores[0], `stores are missing "${key}"`);
        }
        assert.ok(!('password_hash' in stores[0]));
    }
});

test('GET /api/products returns a list with the expected fields', async () => {
    const res = await fetchSite('/api/products');
    assert.equal(res.status, 200);
    const products = await res.json();
    assert.ok(Array.isArray(products));
    if (products.length > 0) {
        for (const key of ['product_id', 'store_id', 'product_name', 'price', 'inventory_count']) {
            assert.ok(key in products[0], `products are missing "${key}"`);
        }
    }
});

test('input validation still works (bad id gives 400, not a crash)', async () => {
    const res = await fetchSite('/api/products/abc');
    assert.equal(res.status, 400);
});

test('unknown /api path gives JSON 404 (API routes are mounted before the React catch-all)', async () => {
    const res = await fetchSite('/api/does-not-exist');
    assert.equal(res.status, 404);
    assert.match(res.headers.get('content-type') || '', /json/);
});

test('the React site is being served', { skip: process.env.SMOKE_SKIP_FRONTEND === '1' }, async () => {
    const res = await fetchSite('/');
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type') || '', /html/);
});
