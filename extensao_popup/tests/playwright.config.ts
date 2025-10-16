import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para a extensão buildada
const distPath = path.join(__dirname, '..', 'dist');

export default defineConfig({
  // Diretório dos testes
  testDir: __dirname,
  
  // Timeout para cada teste
  timeout: 30 * 1000,
  
  // Expectativas de timeout
  expect: {
    timeout: 5000
  },
  
  // Número de tentativas em caso de falha
  retries: process.env.CI ? 2 : 0,
  
  // Número de workers (parallelização)
  workers: process.env.CI ? 1 : undefined,
  
  // Reporters
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'playwright-report/results.json' }]
  ],
  
  // Configurações de uso compartilhadas
  use: {
    // Captura de screenshot apenas em falha
    screenshot: 'only-on-failure',
    
    // Captura de vídeo apenas em falha
    video: 'retain-on-failure',
    
    // Trace apenas em falha
    trace: 'on-first-retry',
    
    // Headless mode
    headless: true,
  },
  
  // Projetos (navegadores)
  projects: [
    {
      name: 'chromium-with-extension',
      use: {
        ...devices['Desktop Chrome'],
        // Argumentos para carregar a extensão
        launchOptions: {
          args: [
            `--disable-extensions-except=${distPath}`,
            `--load-extension=${distPath}`,
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
          ]
        }
      }
    }
  ],
  
  // Pasta de output
  outputDir: 'test-results',
});
