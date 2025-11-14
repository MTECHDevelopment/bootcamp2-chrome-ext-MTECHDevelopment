// tests/e2e.spec.js
import { test, expect } from '@playwright/test';

test('PWA carrega e tem o título correto', async ({ page }) => {
  await page.goto('http://web:80'); // 'web' é o nome do serviço
  await expect(page).toHaveTitle(/Nome do Seu PWA/); // Mude isso
});