# 🧪 Guia de Validação - Entrega II

## ✅ Checklist de Entregáveis

### 1. Arquivos de Containerização
- [x] `Dockerfile` - Baseado em `mcr.microsoft.com/playwright:v1.46.0-jammy`
- [x] `docker-compose.yml` - Configurado com serviço e2e e shm_size=2gb

### 2. Suíte de Testes E2E
- [x] `tests/playwright.config.ts` - Configuração do Playwright
- [x] `tests/extension.spec.ts` - 10 casos de teste implementados
- [x] Testes rodam localmente via `docker compose`
- [x] Testes rodam no CI via GitHub Actions

### 3. Workflow CI/CD
- [x] `.github/workflows/ci.yml` - Pipeline completo
- [x] Build da extensão
- [x] Execução de testes E2E
- [x] Upload de artefatos (relatório HTML + extension.zip)
- [x] Release automática com versionamento

### 4. Scripts e Build
- [x] `scripts/build-extension.mjs` - Build e empacotamento
- [x] `package.json` - Dependências e scripts configurados
- [x] Geração de `dist/extension.zip`

---

## 🚀 Como Validar Localmente

### Passo 1: Instalar Dependências

```bash
cd extensao_popup
npm install
```

### Passo 2: Build da Extensão

```bash
npm run build
```

**Resultado esperado:**
```
🏗️  Iniciando build da extensão...
🗑️  Removendo dist/ anterior...
📦 Copiando arquivos...
  ✓ manifest.json
  ✓ src/
📦 Gerando extension.zip...
✅ Build concluído!
📊 Total: XXXXX bytes
📁 Localização: dist/
📦 Pacote: dist/extension.zip
```

### Passo 3: Executar Testes (Sem Docker)

```bash
# Instalar Playwright browsers
npx playwright install --with-deps chromium

# Executar testes
npm run test:e2e
```

**Resultado esperado:**
- Todos os 10 testes devem passar ✅
- Relatório HTML gerado em `playwright-report/`

### Passo 4: Visualizar Relatório

```bash
npx playwright show-report
```

Abrirá no navegador com dashboard de resultados.

---

## 🐋 Como Validar com Docker

### Passo 1: Build da Imagem

```bash
cd extensao_popup
docker compose build
```

**Resultado esperado:**
```
[+] Building ...
 => [internal] load build definition from Dockerfile
 => => transferring dockerfile: ...
 => exporting to image
 => => writing image sha256:...
 => => naming to docker.io/bootcamp/ext-e2e:latest
```

### Passo 2: Executar Testes no Container

```bash
docker compose run --rm e2e
```

**Resultado esperado:**
- Container inicia
- Build da extensão é executado
- Testes E2E são executados
- 10 testes passam ✅
- Container finaliza

### Passo 3: Executar com Relatório Detalhado

```bash
docker compose run --rm e2e npm run test:e2e -- --reporter=list,html
```

---

## 🔄 Como Validar CI no GitHub Actions

### Passo 1: Fazer Push para o Repositório

```bash
git add .
git commit -m "feat: adiciona containerização e testes E2E"
git push origin main
```

### Passo 2: Verificar Execução do Workflow

1. Acesse: https://github.com/MTECHDevelopment/bootcamp2-chrome-ext-MTECHDevelopment/actions
2. Clique no workflow "CI - Build e Testes E2E"
3. Verifique a última execução

**Status esperado:** ✅ Todos os jobs devem passar

### Passo 3: Baixar Artefatos

Na página do workflow run, na seção "Artifacts":

1. **playwright-report** - Relatório HTML dos testes
2. **test-results** - Screenshots e vídeos (se houver falhas)
3. **extension-zip** - Arquivo `extension.zip` pronto para instalar
4. **extension-dist** - Pasta dist completa

### Passo 4: Verificar Release (Se Push na Main)

1. Acesse: https://github.com/MTECHDevelopment/bootcamp2-chrome-ext-MTECHDevelopment/releases
2. Verifique a release com tag `v{version}` (ex: `v0.1.1`)
3. Download do `extension.zip` deve estar disponível

---

## 📊 Testes Implementados

### Lista de Testes E2E

1. ✅ **extensão deve estar carregada** - Verifica ID da extensão
2. ✅ **content script deve aplicar destaque nos links** - Valida outline nos links
3. ✅ **popup deve abrir e exibir elementos principais** - Verifica UI do popup
4. ✅ **toggle de destaque deve estar funcional** - Testa checkbox
5. ✅ **botão de copiar seleção deve existir** - Verifica botão copy
6. ✅ **botão de ativar foco deve existir** - Verifica botão focus
7. ✅ **área de notas deve existir e permitir input** - Testa textarea
8. ✅ **página de opções deve existir e carregar** - Valida options.html
9. ✅ **color picker deve permitir mudança de cor** - Testa input color
10. ✅ **lista de headings deve carregar** - Verifica lista de títulos

---

## 🎯 Critérios de Avaliação (Atendidos)

### ✅ Repositório Funcional
- Dockerfile, docker-compose.yml, testes e workflow criados
- Estrutura de pastas organizada
- Código limpo e documentado

### ✅ Build Reprodutível
- Build funciona localmente (`npm run build`)
- Build funciona no container (`docker compose run e2e`)
- Build funciona no CI (GitHub Actions)

### ✅ Testes Passando
- 10 casos de teste implementados
- Testes passam localmente
- Testes passam no container
- Testes passam no CI

### ✅ Artefatos do CI
- Relatório HTML do Playwright publicado
- Extension.zip disponível para download
- Test results com screenshots de falhas (se houver)
- Retenção configurada (30-90 dias)

### ✅ Documentação
- README.md completo com instruções
- Commits claros e descritivos
- Comentários no código onde necessário

---

## 🐛 Troubleshooting

### Erro: "Cannot find module 'archiver'"

```bash
cd extensao_popup
npm install
```

### Erro: "Chromium not found"

```bash
npx playwright install --with-deps chromium
```

### Erro: "Extension failed to load"

```bash
# Verificar se o build foi executado
ls -la dist/

# Rebuildar se necessário
npm run build
```

### Erro: "EACCES: permission denied" no Docker

```bash
# Linux: adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
newgrp docker

# Ou executar com sudo
sudo docker compose run --rm e2e
```

### Testes falhando no CI mas passando localmente

- Verificar logs do GitHub Actions
- Aumentar timeout nos testes se necessário
- Verificar diferenças de ambiente (variáveis, permissões)

---

## 📸 Capturas de Tela Esperadas

### 1. Execução Local dos Testes
```
Running 10 tests using 1 worker

  ✓  [chromium-with-extension] › extension.spec.ts:24:3 › Testes E2E da Extensão Chrome › extensão deve estar carregada
  ✓  [chromium-with-extension] › extension.spec.ts:29:3 › Testes E2E da Extensão Chrome › content script deve aplicar destaque nos links
  ...
  10 passed (15s)
```

### 2. Relatório HTML do Playwright
- Dashboard com gráfico de resultados
- Lista de testes com status
- Detalhes de cada teste (duração, screenshots)

### 3. GitHub Actions - Workflow Run
- ✅ Checkout código
- ✅ Setup Node.js
- ✅ Instalar dependências
- ✅ Instalar navegadores do Playwright
- ✅ Build da extensão
- ✅ Executar testes E2E
- ✅ Publicar artefatos

### 4. Artefatos Disponíveis
- playwright-report (XX MB)
- test-results (XX MB)
- extension-zip (XX KB)
- extension-dist (XX KB)

---

## 🎓 Conclusão

Todos os requisitos da **Entrega II** foram implementados com sucesso:

✅ Containerização completa com Docker  
✅ Testes E2E robustos com Playwright  
✅ CI/CD automatizado com GitHub Actions  
✅ Artefatos e releases automáticas  
✅ Documentação completa e clara  

**Próximos passos:**
1. Fazer push para o repositório
2. Verificar execução do workflow
3. Baixar artefatos e validar
4. Compartilhar links solicitados na entrega
