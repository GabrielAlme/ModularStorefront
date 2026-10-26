
import { test } from 'node:test';
import assert from 'node:assert/strict';
import process from 'node:process';


const baseUrl = process.env.BACKEND_URL || 'http://localhost:3000';

test('backend health endpoint responds with HTTP 200', async () => {
	const response = await fetch(new URL('/health', baseUrl));
	assert.equal(response.status, 200);
});
