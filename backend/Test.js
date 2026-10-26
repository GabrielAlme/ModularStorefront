
import { test } from 'node:test';
import assert from 'node:assert/strict';
import process from 'node:process';


const baseUrl = process.env.BACKEND_URL== "postgresql://neondb_owner:npg_EYLHN4d2qrCn@ep-spring-king-b5t16yvd-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require" || 'http://localhost:3000';

test('backend health endpoint responds with HTTP 200', async () => {
	const response = await fetch(new URL('/health', baseUrl));
	assert.equal(response.status, 200);
});
