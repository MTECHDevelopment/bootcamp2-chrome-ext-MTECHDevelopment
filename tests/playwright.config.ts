import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

// Define o caminho para a pasta dist/
const distPath = path.join(__dirname, '..', 'dist');

export default defineConfig({
  testDir: __dirname,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    headless: true, // Use headless=false para debug local
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium-with-extension',
      use: {
        ...devices['Desktop Chrome'],
        // Argumentos cruciais para carregar a extensão no Chromium
        launchOptions: {
          args: [
            `--disable-extensions-except=${distPath}`,
            `--load-extension=${distPath}`
          ]
        }
      }
    }
  ]
});