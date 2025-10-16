# 🚀 Comandos Rápidos - Quick Start

## 📦 Setup Inicial

```bash
cd extensao_popup
npm install
```

## 🏗️ Build da Extensão

```bash
npm run build
```

## 🧪 Rodar Testes Localmente

```bash
# Instalar Chromium do Playwright
npx playwright install --with-deps chromium

# Rodar testes
npm run test:e2e

# Ver relatório
npx playwright show-report
```

## 🐋 Docker Commands

```bash
# Build da imagem
docker compose build

# Rodar testes no container
docker compose run --rm e2e

# Rodar testes com output detalhado
docker compose run --rm e2e npm run test:e2e -- --reporter=list
```

## 🔄 Git Workflow

```bash
# Adicionar todos os arquivos
git add .

# Commit
git commit -m "feat: adiciona containerização e testes E2E"

# Push para main (dispara CI)
git push origin main
```

## 🎯 Links Importantes

- **Actions**: https://github.com/MTECHDevelopment/bootcamp2-chrome-ext-MTECHDevelopment/actions
- **Releases**: https://github.com/MTECHDevelopment/bootcamp2-chrome-ext-MTECHDevelopment/releases

## ✅ Checklist de Entrega

- [ ] Push do código para o repositório
- [ ] Workflow do GitHub Actions executado com sucesso
- [ ] Artefatos (playwright-report e extension.zip) disponíveis
- [ ] Screenshot do relatório do Playwright
- [ ] Link do repositório
- [ ] Link do workflow run
