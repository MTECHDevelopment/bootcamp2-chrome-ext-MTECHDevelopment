# 🚀 Extensão Chrome - Bootcamp MTECHDevelopment

[![CI - Build e Testes E2E](https://github.com/MTECHDevelopment/bootcamp2-chrome-ext-MTECHDevelopment/actions/workflows/ci.yml/badge.svg)](https://github.com/MTECHDevelopment/bootcamp2-chrome-ext-MTECHDevelopment/actions/workflows/ci.yml)

Extensão do Chrome com testes E2E automatizados usando Playwright, containerização com Docker e CI/CD com GitHub Actions.

## 📋 Funcionalidades da Extensão

- ✅ **Destaque de Links**: Aplica outline colorido em todos os links da página
- 📊 **Estatísticas da Página**: Exibe contagem de links, imagens e palavras
- 📝 **Notas por Site**: Salva notas específicas para cada domínio
- 🎨 **Customização de Cores**: Escolha a cor do destaque dos links
- 🔍 **Lista de Títulos**: Mostra hierarquia de headings da página
- 📋 **Copiar Seleção**: Copia texto selecionado para área de transferência
- 🎯 **Modo Foco**: Ativa modo de foco na página

## 🏗️ Estrutura do Projeto

```
extensao_popup/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Pipeline CI/CD
├── src/
│   ├── background/
│   │   └── service-worker.js      # Service Worker
│   ├── content/
│   │   └── content.js             # Content Script
│   ├── icons/                     # Ícones da extensão
│   ├── options/
│   │   ├── options.html           # Página de opções
│   │   └── options.js
│   ├── popup/
│   │   ├── popup.html             # Interface do popup
│   │   ├── popup.js               # Lógica do popup
│   │   └── popup.css
│   └── styles/
│       └── global.css
├── tests/
│   ├── playwright.config.ts       # Configuração do Playwright
│   └── extension.spec.ts          # Testes E2E
├── scripts/
│   └── build-extension.mjs        # Script de build
├── Dockerfile                     # Container para testes
├── docker-compose.yml             # Orquestração local
├── package.json
└── manifest.json                  # Manifest V3
```

## 🐋 Executar com Docker

### Build da Imagem

```bash
cd extensao_popup
docker compose build
```

### Executar Testes E2E

```bash
docker compose run --rm e2e
```

### Executar Testes com Output Detalhado

```bash
docker compose run --rm e2e npm run test:e2e -- --reporter=list
```

## 💻 Executar Localmente (Sem Docker)

### Pré-requisitos

- Node.js 20+
- npm

### Instalação

```bash
cd extensao_popup
npm install
```

### Build da Extensão

```bash
npm run build
```

Isso irá:
- Criar pasta `dist/` com os arquivos da extensão
- Gerar `dist/extension.zip` pronto para distribuição

### Executar Testes E2E

```bash
npm run test:e2e
```

### Visualizar Relatório de Testes

```bash
npx playwright show-report
```

## 🧪 Testes Implementados

Os testes E2E cobrem:

1. ✅ Carregamento da extensão
2. ✅ Content script aplica destaque nos links
3. ✅ Popup abre e exibe elementos principais
4. ✅ Toggle de destaque funcional
5. ✅ Botões de ação existem e são clicáveis
6. ✅ Área de notas permite input
7. ✅ Página de opções carrega corretamente
8. ✅ Color picker permite mudança de cor
9. ✅ Lista de headings carrega

## 🔄 CI/CD com GitHub Actions

O workflow é executado automaticamente em:
- Push para `main` ou `develop`
- Pull Requests
- Manualmente via `workflow_dispatch`

### Etapas do CI

1. **Build**: Compila a extensão para `dist/`
2. **Testes E2E**: Executa suite completa com Playwright
3. **Artefatos**: Publica relatórios e ZIP da extensão
4. **Release**: (apenas na main) Cria release com tag automática

### Artefatos Gerados

- 📊 `playwright-report/` - Relatório HTML dos testes
- 📦 `extension.zip` - Extensão pronta para instalar
- 🗂️ `test-results/` - Resultados e screenshots de falhas

## 📦 Instalar a Extensão no Chrome

### Método 1: Carregar via Modo Desenvolvedor

1. Execute `npm run build`
2. Abra `chrome://extensions/`
3. Ative "Modo do desenvolvedor"
4. Clique em "Carregar sem compactação"
5. Selecione a pasta `dist/`

### Método 2: Instalar do Release

1. Baixe `extension.zip` da última release
2. Descompacte em uma pasta
3. Siga os passos do Método 1 com a pasta descompactada

## 🛠️ Scripts Disponíveis

```json
{
  "build": "node scripts/build-extension.mjs",
  "test:e2e": "playwright test --reporter=list,html",
  "test": "npm run build && npm run test:e2e",
  "ci": "npm ci && npm run test"
}
```

## 📊 Configuração do Playwright

O Playwright está configurado para:
- ✅ Carregar a extensão via `--load-extension`
- ✅ Rodar em modo headless
- ✅ Gerar relatórios HTML e JSON
- ✅ Capturar screenshots e vídeos em falhas
- ✅ Retry automático em ambiente CI

## 🔍 Troubleshooting

### Testes falhando localmente

```bash
# Reinstalar navegadores
npx playwright install --with-deps chromium

# Limpar cache e rebuildar
rm -rf dist node_modules
npm install
npm run build
```

### Container Docker com problemas de memória

Aumente o `shm_size` no `docker-compose.yml`:

```yaml
services:
  e2e:
    shm_size: 4gb  # aumentar de 2gb para 4gb
```

### Extensão não carrega nos testes

Verifique se o build foi executado:
```bash
npm run build
ls -la dist/
```

## 📄 Licença

MIT

## 👥 Autor

MTECHDevelopment - Bootcamp Chrome Extension

---

## 🎯 Entregáveis (Requisitos Atendidos)

✅ **Dockerfile** e **docker-compose.yml** funcionais  
✅ **Testes E2E** com Playwright (10 casos de teste)  
✅ **CI/CD** no GitHub Actions com build + testes  
✅ **Artefatos**: relatório HTML e extension.zip  
✅ **Release automática** com versionamento do manifest  
✅ **Documentação completa** de execução local e CI  

## 🚀 Como Entregar

1. **Repositório**: Este repositório já está público
2. **Workflow**: Após o push, verifique em [Actions](https://github.com/MTECHDevelopment/bootcamp2-chrome-ext-MTECHDevelopment/actions)
3. **Artefatos**: Disponíveis em cada workflow run
4. **Release**: Criada automaticamente em `main` com tag `v{version}`
