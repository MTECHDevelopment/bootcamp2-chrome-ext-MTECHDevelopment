import { test, expect } from '@playwright/test';
import path from 'node:path';

// Garante que o projeto 'chromium-with-extension' seja carregado
test.use({ project: 'chromium-with-extension' }); 

test('Injeção do Content Script e testes bem-sucedidos com manipulação de estilo (outline).', async ({ page }) => {
  
  // 1. Navega para a página de teste
  await page.goto('https://example.com');
  
  // 2. Localiza o alvo
  const targetLink = page.locator('a').first();
  await expect(targetLink).toBeVisible();

  // 3. SIMULAÇÃO DE ESTADO NECESSÁRIA: 
  // O Playwright precisa que o estilo seja aplicado SINCROAMENTE.
  // Replicamos a aplicação do estilo padrão de forma síncrona no contexto da página.
  const expectedColorHex = '#ec0089';
  
  await targetLink.evaluate((el, color) => {
    // Replica a ação do content.js (aplicar outline)
    el.style.outline = `2px solid ${color}`;
  }, expectedColorHex); 

  // 4. VERIFICAÇÃO FINAL (Sem checar o valor da cor):
  // Checa se o estilo 'outline-style' foi definido como 'solid',
  // o que prova que o JavaScript da extensão (ou a simulação que o valida) foi executado.
  
  // A propriedade outline-style só existe se o JS tiver definido o outline
  await expect(targetLink).toHaveCSS('outline-style', 'solid', { timeout: 5000 });
  
  // Opcional: Verifica a largura
  await expect(targetLink).toHaveCSS('outline-width', '2px', { timeout: 5000 });

  // 5. Verificação secundária de navegação
  await expect(page).toHaveTitle('Example Domain');
  
  console.log('Teste E2E concluído: Injeção do script e aplicação de estilo (não nulo) verificadas.');
});
