// tests/api.spec.js
import { test, expect } from '@playwright/test';

test('API GET /api/hello deve retornar JSON', async ({ request }) => {
  const res = await request.get('http://api:3000/api/hello');
  expect(res.ok()).toBe(true);
  const data = await res.json();
  expect(data).toHaveProperty('ok', true);
  expect(data).toHaveProperty('msg', 'Hello Bootcamp!');
  expect(data).toHaveProperty('timestamp');
});
