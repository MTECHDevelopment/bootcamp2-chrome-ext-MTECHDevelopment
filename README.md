# 📱 Bootcamp II — PWA + Backend + Docker + CI/CD

> **Entrega Final em Grupo**: Progressive Web App (PWA) completo com backend API containerizado, testes E2E automatizados e CI/CD no GitHub Actions.

![CI Status](https://github.com/MTECHDevelopment/bootcamp2-chrome-ext-MTECHDevelopment/actions/workflows/ci.yml/badge.svg)

## 🎯 Sobre o Projeto

Este projeto transforma uma **extensão Chrome (Entrega I)** em um **PWA funcional** com:
- 📝 **Bloco de Notas PWA** (funciona offline, installável)
- 🔗 **Backend API** (Express.js) com endpoints REST
- 🐳 **Containerização** completa (Docker Compose)
- 🧪 **Testes E2E** automatizados (Playwright)
- ⚙️ **CI/CD** no GitHub Actions com build, testes e deploy
- 🌐 **Publicação** automática em GitHub Pages

---

## 🚀 Quick Start

### Rodar Localmente (Docker Compose)

```bash
# Clonar repositório
git clone https://github.com/MTECHDevelopment/bootcamp2-chrome-ext-MTECHDevelopment.git
cd bootcamp2-chrome-ext-MTECHDevelopment/pwa

# Iniciar containers (PWA + API + Testes)
docker-compose up

# Acessar:
# - PWA: http://localhost:8080
# - API: http://localhost:3000/api/hello
```

### Requisitos

- Docker & Docker Compose (ou Node 20+ + npm)
- Chrome/Edge (para testar PWA)

---

## 📁 Estrutura do Projeto

```
bootcamp2-chrome-ext-MTECHDevelopment/
├── pwa/                          # PWA + API (principal)
│   ├── app/
│   │   ├── web/                  # Frontend PWA (Vanilla JS)
│   │   │   ├── index.html
│   │   │   ├── main.js           # Lógica do bloco de notas
│   │   │   ├── service-worker.js # Cache offline
│   │   │   ├── manifest.webmanifest
│   │   │   └── Dockerfile
│   │   └── api/                  # Backend (Express.js)
│   │       ├── index.js          # Endpoints REST
│   │       ├── package.json
│   │       └── Dockerfile
│   ├── tests/                    # E2E Tests (Playwright)
│   │   ├── api.spec.js
│   │   └── e2e.spec.js
│   ├── docker-compose.yml        # Orquestração
│   └── Dockerfile.e2e
├── .github/workflows/
│   └── ci.yml                    # CI/CD Pipeline
└── README.md
```

---

## 🌐 PWA — Manifest e Offline

### Manifest (`manifest.webmanifest`)
- ✅ Nome, ícones, cores e start_url definidos
- ✅ Display: `standalone` (app-like)
- ✅ Suporte a dispositivos móveis (responsive)

### Service Worker (`service-worker.js`)
- ✅ Cache estratégia (Cache First)
- ✅ Funciona offline
- ✅ Atualização incremental

### Instalação
1. Abra http://localhost:8080
2. Chrome → Menu → "Install app" ou clique no ícone de instalação
3. App instalado na tela inicial! 📱

---

## 🔗 API REST — Endpoints

| Método | Endpoint | Descrição | Exemplo |
|--------|----------|-----------|---------|
| GET | `/api/hello` | Teste de conectividade | `curl http://localhost:3000/api/hello` |
| GET | `/api/data` | Dados mock | `curl http://localhost:3000/api/data` |
| GET | `/api/pokemon/:name` | Busca Pokémon (PokéAPI) | `curl http://localhost:3000/api/pokemon/pikachu` |

**Resposta exemplo** (`/api/hello`):
```json
{
  "ok": true,
  "msg": "Hello Bootcamp!"
}
```

---

## 🧪 Testes

### E2E com Playwright

```bash
# Rodar testes localmente
docker-compose run --build e2e

# Ou no diretório pwa:
npm run test:e2e
```

**Testes implementados:**
- ✅ API endpoint `/api/hello` retorna JSON válido
- ✅ PWA carrega com título correto
- ✅ Offline funciona (Service Worker)

---

## 🐳 Docker Compose

### Serviços

```yaml
services:
  api:       # Backend Express (porta 3000)
  web:       # Frontend PWA com Nginx (porta 8080)
  e2e:       # Testes Playwright
```

### Comandos

```bash
# Iniciar tudo
docker-compose up

# Apenas PWA (sem testes)
docker-compose up web api

# Rodar testes
docker-compose run --build e2e

# Limpar tudo
docker-compose down -v
```

---

## ⚙️ CI/CD — GitHub Actions

### Pipeline Automático

1. **Trigger**: Push ou Pull Request na branch `main`
2. **Build**: Compila PWA e API
3. **Testes**: Roda E2E com Playwright
4. **Relatório**: Upload de artefatos (teste, Lighthouse)
5. **Deploy**: Publica PWA em GitHub Pages

### Artefatos Salvos
- 📊 Relatório Playwright (HTML)
- 📦 Pacote PWA
- 📈 Relatório Lighthouse (opcional)

---

## 📊 Performance — Lighthouse

Métricas esperadas (validadas em CI):
- **Performance**: ≥ 80
- **PWA**: ≥ 80
- **Accessibility**: ≥ 80
- **Best Practices**: ≥ 80
- **SEO**: ≥ 80

---

## 🌍 Publicação — GitHub Pages

PWA publicado em: `https://mtech.github.io/bootcamp2-chrome-ext-MTECHDevelopment/`

Automaticamente updated a cada push em `main`.

---

## 📝 Funcionalidades do PWA

### Bloco de Notas
- ✅ Criar/editar/deletar notas
- ✅ Persistência em localStorage
- ✅ Offline completo
- ✅ Download em TXT

### Estatísticas
- ✅ Contagem de palavras, caracteres, links, imagens
- ✅ Caracteres selecionados em tempo real

### Customização
- ✅ Seletor de cor da borda do editor
- ✅ Persistência de preferências

---

## 🛠️ Desenvolvimento

### Setup Local (sem Docker)

```bash
cd pwa/app/web
npm install
npm start

# Em outro terminal:
cd pwa/app/api
npm install
npm start
```

### Stack

- **Frontend**: Vanilla JS (ES6+), CSS, HTML5
- **Backend**: Node.js + Express
- **Build**: Docker + Nginx
- **Testes**: Playwright
- **CI/CD**: GitHub Actions

---

## 📚 Como Contribuir

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/sua-feature`
3. Commits convencionais: `git commit -m "feat: descrição"`
4. Push: `git push origin feature/sua-feature`
5. Abra Pull Request

---

## 📧 Contato & Links

- **GitHub**: [MTECHDevelopment/bootcamp2-chrome-ext-MTECHDevelopment](https://github.com/MTECHDevelopment/bootcamp2-chrome-ext-MTECHDevelopment)
- **PWA Live**: [GitHub Pages](https://mtech.github.io/bootcamp2-chrome-ext-MTECHDevelopment/)
- **CI/CD**: [GitHub Actions](https://github.com/MTECHDevelopment/bootcamp2-chrome-ext-MTECHDevelopment/actions)

---

## 🎓 Extensão Chrome Original — Objetivos e funcionalidades

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