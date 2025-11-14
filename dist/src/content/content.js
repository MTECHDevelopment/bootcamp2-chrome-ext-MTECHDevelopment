// Verificação defensiva: algumas páginas (chrome://, Web Store, PDFs ou file:// sem permissão)
// não expõem as APIs de extensão para content scripts.
if (typeof chrome === 'undefined' || !chrome.storage) {
  console.warn('[Extensão Popup] chrome.storage indisponível nesta página. Possíveis causas: chrome://, Web Store, PDF ou file:// sem permissão em Detalhes da extensão.');
}

let currentSettings = {
  enabled: true,
  favoriteColor: '#ec0089'
};

// Função para aplicar ou remover os destaques
function applyHighlights(settings) {
  const links = document.querySelectorAll('a');
  for (const link of links) {
    if (settings.enabled) {
      link.style.outline = `2px solid ${settings.favoriteColor}`;
    } else {
      link.style.outline = 'none';
    }
  }
}

// Carrega as configurações iniciais e aplica os destaques (se API disponível)
if (chrome?.storage?.sync) {
  chrome.storage.sync.get(currentSettings, (items) => {
    currentSettings = items;
    applyHighlights(currentSettings);
  });
}

// Ouve por mudanças nas configurações e reaplica os destaques
if (chrome?.storage?.onChanged) {
  chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { newValue }] of Object.entries(changes)) {
      currentSettings[key] = newValue;
    }
    applyHighlights(currentSettings);
  });
}

// Listener para ações simples vindas do popup, se necessário no futuro
if (chrome?.runtime?.onMessage) {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg?.type === 'SCROLL_TO_TOP') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      sendResponse({ ok: true });
    }
  });
}