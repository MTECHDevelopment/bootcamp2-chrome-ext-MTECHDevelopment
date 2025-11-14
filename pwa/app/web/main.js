// Utilitários
const getActiveTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
};

// Elementos
const elLinks = document.getElementById('stat-links');
const elImages = document.getElementById('stat-images');
const elWords = document.getElementById('stat-words');
const elSelection = document.getElementById('stat-selection');
const listHeadings = document.getElementById('headings-list');
const toggleEnabled = document.getElementById('toggle-enabled');
const colorPicker = document.getElementById('color-picker');
const btnCopy = document.getElementById('btn-copy');
const btnFocus = document.getElementById('btn-focus');
const hostSpan = document.getElementById('host');
const noteText = document.getElementById('note-text');
const btnSaveNote = document.getElementById('btn-save-note');
const noteStatus = document.getElementById('note-status');

// Estado padrão
const defaultSettings = { enabled: true, favoriteColor: '#ec0089' };

// Carrega settings e nota
async function loadState() {
  const tab = await getActiveTab();
  const url = new URL(tab.url || '');
  hostSpan.textContent = url.hostname || 'este site';

  const st = await chrome.storage.sync.get(defaultSettings);
  toggleEnabled.checked = !!st.enabled;
  colorPicker.value = st.favoriteColor || defaultSettings.favoriteColor;

  // Nota por domínio
  const noteKey = `note:${url.hostname}`;
  const saved = await chrome.storage.local.get([noteKey]);
  noteText.value = saved[noteKey] || '';
}

fetch('http://localhost:3000/api/hello')
  .then(res => res.json())
  .then(data => console.log(data.msg));


// Estatísticas e headings
async function refreshPageData() {
  const tab = await getActiveTab();
  if (!tab?.id) return;
  try {
    const [{ result } = {}] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const count = (sel) => document.querySelectorAll(sel).length;
        const links = count('a[href]');
        const images = count('img');
        const text = document.body?.innerText || '';
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        const selection = String(window.getSelection?.() || '');
        const hs = Array.from(document.querySelectorAll('h1,h2,h3'))
          .slice(0, 12)
          .map((el) => ({ tag: el.tagName, text: el.textContent?.trim().slice(0, 80) || '', id: el.id }));
        return { links, images, words, selectionLen: selection.length, headings: hs };
      }
    });
    if (!result) return;
    elLinks.textContent = String(result.links);
    elImages.textContent = String(result.images);
    elWords.textContent = String(result.words);
    elSelection.textContent = result.selectionLen ? `${result.selectionLen}` : '–';

    // render headings
    listHeadings.innerHTML = '';
    if (!result.headings?.length) {
      listHeadings.innerHTML = '<li class="placeholder">Nenhum título encontrado</li>';
    } else {
      for (const h of result.headings) {
        const li = document.createElement('li');
        li.textContent = `${h.tag}: ${h.text || '(sem texto)'}`;
        li.title = 'Ir para seção';
        li.style.cursor = 'pointer';
        li.addEventListener('click', async () => {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            args: [h.id, h.text],
            func: (id, text) => {
              const el = id ? document.getElementById(id) : document.querySelector('h1,h2,h3');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.animate([{ background: 'rgba(99,102,241,.35)' }, { background: 'transparent' }], { duration: 800 });
              } else {
                alert(`Não foi possível localizar: ${text}`);
              }
            }
          });
        });
        listHeadings.appendChild(li);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

// Aplicar destaques
async function applyHighlights() {
  const st = await chrome.storage.sync.get(defaultSettings);
  const tab = await getActiveTab();
  if (!tab?.id) return;
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    args: [!!st.enabled, st.favoriteColor],
    func: (enabled, color) => {
      const links = document.querySelectorAll('a');
      for (const link of links) {
        link.style.outline = enabled ? `2px solid ${color}` : 'none';
      }
    }
  });
}

// Foco de leitura
async function toggleFocusMode() {
  const tab = await getActiveTab();
  if (!tab?.id) return;
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const id = '___mtech_focus_layer';
      const existing = document.getElementById(id);
      if (existing) { existing.remove(); return; }
      const layer = document.createElement('div');
      layer.id = id;
      Object.assign(layer.style, {
        position: 'fixed', inset: '0', pointerEvents: 'none',
        background: 'radial-gradient(circle at center, rgba(0,0,0,0) 35%, rgba(0,0,0,.45) 60%, rgba(0,0,0,.65) 100%)',
        zIndex: 2147483647
      });
      document.body.appendChild(layer);
    }
  });
}

// Copiar seleção
async function copySelection() {
  const tab = await getActiveTab();
  if (!tab?.id) return;
  const [{ result } = {}] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => String(window.getSelection?.() || '')
  });
  const text = result || '';
  if (!text) return;
  await navigator.clipboard.writeText(text);
}

// Eventos UI
document.addEventListener('DOMContentLoaded', async () => {
  try { await loadState(); } catch (e) { console.error('loadState falhou', e); }
  try { await refreshPageData(); } catch (e) { console.error('refreshPageData falhou', e); }
  try { await applyHighlights(); } catch (e) { console.error('applyHighlights falhou', e); }
});

toggleEnabled.addEventListener('change', async (e) => {
  const enabled = e.currentTarget.checked;
  try {
    await chrome.storage.sync.set({ enabled });
    await applyHighlights();
  } catch (e) {
    console.error('Falha ao alternar destaques', e);
  }
});

colorPicker.addEventListener('input', async (e) => {
  const favoriteColor = e.currentTarget.value;
  try {
    await chrome.storage.sync.set({ favoriteColor });
    await applyHighlights();
  } catch (e) {
    console.error('Falha ao aplicar cor', e);
  }
});

btnFocus.addEventListener('click', async () => {
  try { await toggleFocusMode(); } catch (e) { console.error('toggleFocusMode falhou', e); }
});
btnCopy.addEventListener('click', async () => {
  try { await copySelection(); } catch (e) { console.error('copySelection falhou', e); }
});

btnSaveNote.addEventListener('click', async () => {
  const tab = await getActiveTab();
  const url = new URL(tab.url || '');
  const noteKey = `note:${url.hostname}`;
  const note = noteText.value || '';
  await chrome.storage.local.set({ [noteKey]: note });

  // Coleta título e meta description da página
  let pageInfo = { title: tab.title || url.hostname, description: '' };
  try {
    if (tab?.id) {
      const [{ result } = {}] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const getMeta = (name) =>
            document.querySelector(`meta[name="${name}"]`)?.getAttribute('content') ||
            document.querySelector(`meta[property="og:description"]`)?.getAttribute('content') ||
            '';
          const title = document.title || '';
          const description =
            getMeta('description') ||
            getMeta('og:description') ||
            (document.body?.innerText || '').trim().split(/\n+/).find(Boolean)?.slice(0, 300) ||
            '';
          return { title, description };
        }
      });
      if (result) pageInfo = result;
    }
  } catch (e) {
    console.warn('Falha ao obter info da página', e);
  }

  // Resumo do que a extensão faz
  const man = chrome.runtime.getManifest?.() || { name: 'Extensão', version: '', description: '' };
  const extensionSummary = [
    `${man.name || 'Extensão'} ${man.version ? `(v${man.version})` : ''}`.trim(),
    man.description || '—',
    '',
    'Esta extensão auxilia a leitura e a navegação da página atual:',
    '- Destaca links com a cor preferida para facilitar a visualização.',
    '- Exibe estatísticas rápidas (links, imagens, palavras e seleção).',
    '- Lista títulos (h1–h3) e permite pular para a seção.',
    '- Possui modo foco para reduzir distrações.',
    '- Permite salvar notas por site.',
  ].join('\n');

  // Monta o conteúdo do TXT
  const now = new Date();
  const header = [
    `Página: ${pageInfo.title || url.hostname}`,
    `URL: ${url.href}`,
    pageInfo.description ? `Descrição: ${pageInfo.description}` : 'Descrição: (não encontrada)',
    `Data: ${now.toLocaleString()}`,
  ].join('\n');

  const fileContent = [
    '=== Sobre a extensão ===',
    extensionSummary,
    '',
    '=== Informações da página ===',
    header,
    '',
    '=== Sua nota ===',
    note || '(vazia)'
  ].join('\n');

  // Gera um nome de arquivo amigável por domínio e data
  const safeHost = (url.hostname || 'nota').replace(/[^a-z0-9.-]/gi, '_');
  const stamp = now.toISOString().replace(/[:T]/g, '-').replace(/\..+/, '');
  const filename = `nota-${safeHost}-${stamp}.txt`;

  // Faz download usando chrome.downloads (requer permissão)
  // Usa data URL para maior compatibilidade entre contextos
  const dataUrl = 'data:text/plain;charset=utf-8,' + encodeURIComponent("\uFEFF" + fileContent);
  const downloadWithApi = () => new Promise((resolve, reject) => {
    try {
      chrome.downloads.download({ url: dataUrl, filename, saveAs: true }, (downloadId) => {
        const err = chrome.runtime.lastError?.message;
        if (err || downloadId === undefined) return reject(new Error(err || 'Falha no download'));
        resolve(downloadId);
      });
    } catch (e) {
      reject(e);
    }
  });

  try {
    await downloadWithApi();
  } catch (e) {
    console.warn('API downloads falhou, tentando fallback via <a download>...', e);
    try {
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e2) {
      console.error('Fallback de âncora também falhou', e2);
    }
  }

  noteStatus.textContent = 'Nota salva e TXT gerado!';
  setTimeout(() => (noteStatus.textContent = ''), 2000);
});