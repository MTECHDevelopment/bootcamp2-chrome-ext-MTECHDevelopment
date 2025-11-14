// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // 1. Diga ao Playwright onde encontrar os arquivos de teste
  // Isso impede que ele encontre os arquivos de API antigos.
  testDir: './tests',

  // 2. Onde seu PWA (web) está rodando (para os testes E2E)
  use: {
    baseURL: 'http://localhost:8080',
  },
});