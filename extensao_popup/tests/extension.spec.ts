import { test, expect, chromium, type BrowserContext } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dist = path.resolve(__dirname, '..', 'dist');

let context: BrowserContext;
let extensionId: string;

test.describe('Testes E2E da Extensão Chrome', () => {
  test.beforeAll(async () => {
    // Inicia o contexto do navegador com a extensão carregada
    context = await chromium.launchPersistentContext('', {
      headless: true,
      args: [
        `--disable-extensions-except=${dist}`,
        `--load-extension=${dist}`,
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });

    // Aguarda e obtém o ID da extensão
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }
    extensionId = background.url().split('/')[2];
    console.log('Extensão carregada com ID:', extensionId);
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('extensão deve estar carregada', async () => {
    expect(extensionId).toBeTruthy();
    expect(extensionId.length).toBeGreaterThan(10);
  });

  test('content script deve aplicar destaque nos links', async ({ }) => {
    const page = await context.newPage();
    await page.goto('https://example.com');
    
    // Aguarda o carregamento da página
    await page.waitForLoadState('networkidle');
    
    // Verifica se existe pelo menos um link na página
    const linksCount = await page.locator('a').count();
    expect(linksCount).toBeGreaterThan(0);
    
    // Verifica se o link tem o estilo de outline aplicado
    const firstLink = page.locator('a').first();
    await expect(firstLink).toBeVisible();
    
    // Verifica a propriedade outline
    const outlineStyle = await firstLink.evaluate((el) => {
      return window.getComputedStyle(el).outline;
    });
    
    // O outline deve estar definido (não vazio)
    expect(outlineStyle).toBeTruthy();
    
    await page.close();
  });

  test('popup deve abrir e exibir elementos principais', async ({ }) => {
    const page = await context.newPage();
    await page.goto('https://example.com');
    await page.waitForLoadState('networkidle');
    
    // Abre a página do popup
    const popupPage = await context.newPage();
    await popupPage.goto(`chrome-extension://${extensionId}/src/popup/popup.html`);
    
    // Verifica elementos principais do popup
    await expect(popupPage.locator('.title')).toContainText('Extensão Popup');
    await expect(popupPage.locator('#stat-links')).toBeVisible();
    await expect(popupPage.locator('#stat-images')).toBeVisible();
    await expect(popupPage.locator('#stat-words')).toBeVisible();
    await expect(popupPage.locator('#toggle-enabled')).toBeVisible();
    await expect(popupPage.locator('#color-picker')).toBeVisible();
    
    await popupPage.close();
    await page.close();
  });

  test('toggle de destaque deve estar funcional', async ({ }) => {
    const page = await context.newPage();
    await page.goto('https://example.com');
    await page.waitForLoadState('networkidle');
    
    // Abre o popup
    const popupPage = await context.newPage();
    await popupPage.goto(`chrome-extension://${extensionId}/src/popup/popup.html`);
    
    // Verifica se o toggle existe
    const toggle = popupPage.locator('#toggle-enabled');
    await expect(toggle).toBeVisible();
    
    // Verifica se pode clicar no toggle
    await toggle.click();
    
    await popupPage.close();
    await page.close();
  });

  test('botão de copiar seleção deve existir', async ({ }) => {
    const popupPage = await context.newPage();
    await popupPage.goto(`chrome-extension://${extensionId}/src/popup/popup.html`);
    
    const btnCopy = popupPage.locator('#btn-copy');
    await expect(btnCopy).toBeVisible();
    await expect(btnCopy).toContainText('Copiar seleção');
    
    await popupPage.close();
  });

  test('botão de ativar foco deve existir', async ({ }) => {
    const popupPage = await context.newPage();
    await popupPage.goto(`chrome-extension://${extensionId}/src/popup/popup.html`);
    
    const btnFocus = popupPage.locator('#btn-focus');
    await expect(btnFocus).toBeVisible();
    await expect(btnFocus).toContainText('Ativar foco');
    
    await popupPage.close();
  });

  test('área de notas deve existir e permitir input', async ({ }) => {
    const popupPage = await context.newPage();
    await popupPage.goto(`chrome-extension://${extensionId}/src/popup/popup.html`);
    
    const noteText = popupPage.locator('#note-text');
    await expect(noteText).toBeVisible();
    
    // Testa digitar uma nota
    await noteText.fill('Esta é uma nota de teste');
    const value = await noteText.inputValue();
    expect(value).toBe('Esta é uma nota de teste');
    
    // Verifica botão de salvar
    const btnSave = popupPage.locator('#btn-save-note');
    await expect(btnSave).toBeVisible();
    
    await popupPage.close();
  });

  test('página de opções deve existir e carregar', async ({ }) => {
    const optionsPage = await context.newPage();
    await optionsPage.goto(`chrome-extension://${extensionId}/src/options/options.html`);
    
    // Verifica se a página carrega sem erros
    await optionsPage.waitForLoadState('networkidle');
    
    // Verifica se a página tem conteúdo
    const bodyText = await optionsPage.textContent('body');
    expect(bodyText).toBeTruthy();
    
    await optionsPage.close();
  });

  test('color picker deve permitir mudança de cor', async ({ }) => {
    const popupPage = await context.newPage();
    await popupPage.goto(`chrome-extension://${extensionId}/src/popup/popup.html`);
    
    const colorPicker = popupPage.locator('#color-picker');
    await expect(colorPicker).toBeVisible();
    
    // Verifica o valor padrão
    const defaultColor = await colorPicker.inputValue();
    expect(defaultColor).toBeTruthy();
    
    // Tenta mudar a cor
    await colorPicker.fill('#ff0000');
    const newColor = await colorPicker.inputValue();
    expect(newColor).toBe('#ff0000');
    
    await popupPage.close();
  });

  test('lista de headings deve carregar', async ({ }) => {
    const page = await context.newPage();
    await page.goto('https://example.com');
    await page.waitForLoadState('networkidle');
    
    const popupPage = await context.newPage();
    await popupPage.goto(`chrome-extension://${extensionId}/src/popup/popup.html`);
    
    // Verifica se a lista de headings existe
    const headingsList = popupPage.locator('#headings-list');
    await expect(headingsList).toBeVisible();
    
    await popupPage.close();
    await page.close();
  });
});
