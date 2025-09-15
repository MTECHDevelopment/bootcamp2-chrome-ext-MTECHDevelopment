# bootcamp2-chrome-ext-MTECHDevelopment
# Extensão Chrome — MTECHDevelopment

Extensão MV3 focada em leitura, produtividade e anotações rápidas na página atual.

Esta extensão deverá atender aos objetivos descritos neste README: cada funcionalidade abaixo está implementada e validada para uso no Google Chrome com Manifest V3.

## Objetivos e funcionalidades

- Destacar links da página
	- Alternar destaque de links (ligado/desligado) diretamente no popup.
	- Personalizar a cor do destaque.

- Estatísticas rápidas da página
	- Contagem de links, imagens e palavras.
	- Tamanho da seleção de texto atual.

- Navegação por títulos (sumário)
	- Lista dos primeiros títulos H1–H3 encontrados na página.
	- Clique em um título para rolar suavemente até a seção correspondente.

- Modo foco de leitura
	- Escurece as bordas da página para reduzir distrações.
	- Ativação/desativação pelo popup.

- Copiar seleção
	- Copia para a área de transferência o texto selecionado na aba atual.

- Notas por site + Exportação em TXT
	- Campo para escrever uma nota associada ao domínio da página atual.
	- Armazenamento local da nota por domínio.
	- Ao clicar em “Salvar nota”, a extensão também gera e baixa um arquivo TXT contendo:
		- Um resumo do que a extensão faz (inclui nome/versão/descrição).
		- Informações da página (título, URL e descrição — quando disponível via meta tags ou fallback do conteúdo).
		- Data e hora do registro.
		- A nota escrita pelo usuário.
	- O arquivo é nomeado de forma amigável: `nota-<dominio>-AAAA-MM-DD-HH-MM-SS.txt`.

## Como usar

1. Carregue a extensão no Chrome (Modo Desenvolvedor):
	 - Acesse `chrome://extensions`.
	 - Ative “Modo do desenvolvedor”.
	 - Clique em “Carregar sem compactação” e selecione a pasta `extensao_popup` deste repositório.

2. Abra qualquer página e clique no ícone da extensão para abrir o popup.

3. No popup você pode:
	 - Ativar/desativar o destaque de links e escolher a cor.
	 - Visualizar estatísticas rápidas da página e a lista de títulos; clique em um título para navegar até a seção.
	 - Ativar o modo foco para leitura.
	 - Copiar a seleção atual da página.
	 - Escrever uma nota para o site atual e clicar em “Salvar nota”. Ao salvar:
		 - A nota é guardada localmente por domínio.
		 - Será oferecido para baixar um arquivo `.txt` com o resumo da extensão, informações da página e sua nota.

Observações:
- A caixa “Salvar como…” pode aparecer conforme sua configuração de downloads no Chrome. Você pode ajustar para perguntar sempre ou salvar direto na pasta de downloads.
- Em páginas com políticas de conteúdo rígidas (CSP), a detecção de metadados (descrição) pode ser limitada; a extensão usa fallback do texto da página quando possível.

## Permissões utilizadas e justificativa

- `activeTab` e `tabs`: Identificar a aba ativa e obter informações básicas (URL, título) para agir no contexto correto.
- `scripting`: Executar trechos de código na página para coletar estatísticas, títulos e meta informações.
- `storage`: Guardar preferências (cor/destaque) e notas por domínio.
- `downloads`: Gerar e baixar o arquivo TXT com sua nota e as informações da página.
- `host_permissions: <all_urls>`: Permitir que o conteúdo/injeção funcione em qualquer site que você visitar (apenas quando o popup é usado na aba ativa).

## Arquitetura (Manifest V3)

- Popup (UI): `src/popup/popup.html`, `popup.js`, `popup.css` — interface para ações e notas.
- Content Script: `src/content/content.js` — contexto de página quando necessário.
- Service Worker: `src/background/service-worker.js` — tarefas de background do MV3.
- Manifesto: `manifest.json` — configuração da extensão, permissões e páginas.

## Requisitos atendidos

- Destacar links com cor personalizada — OK
- Exibir estatísticas (links, imagens, palavras, seleção) — OK
- Sumário de títulos H1–H3 com navegação — OK
- Modo foco de leitura — OK
- Copiar seleção — OK
- Notas por site (armazenamento local) — OK
- Exportar TXT ao salvar a nota, contendo resumo da extensão + informações da página + a nota — OK

## Compatibilidade

- Google Chrome (Manifest V3). Outros navegadores baseados em Chromium com suporte a MV3 podem funcionar, mas não são alvo oficial.

## Alterações recentes

- v0.1.2: Adicionada a exportação em TXT ao salvar notas; melhorias gerais no popup.

---

MTECHDevelopment — Bootcamp 2