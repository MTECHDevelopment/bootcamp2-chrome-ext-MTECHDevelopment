// tests/api.spec.js
import { test, expect } from '@playwright/test';

test('API GET /api/hello deve retornar JSON', async ({ request }) => {
  const res = await request.get('http://api:3000/api/hello');
  expect(res.ok()).toBe(true);
  expect(await res.json()).toEqual({
    ok: true,
    msg: 'Hello Bootcamp!'
  });
});