// /pwa/app/api/__tests__/api.test.js
describe('API', () => {
  test('GET /api/hello retorna JSON', async () => {
    const res = await fetch('http://localhost:3000/api/hello');
    expect(res.ok).toBe(true);
  });
});