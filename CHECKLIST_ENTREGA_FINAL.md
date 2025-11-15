# ✅ Checklist - Entrega Final Bootcamp II (PWA + API/Backend • Containers • CI/CD)

## 📊 Status Geral: **70% Completo**

---

## ✅ CONCLUÍDO (70%)

### 1. PWA Básico ✅ (30%)
- [x] **Manifest válido** (`manifest.webmanifest`)
  - [x] Nome, short_name, ícones definidos
  - [x] Display: standalone
  - [x] Start_url: "/"
  - [x] Tema e cores
  
- [x] **Service Worker funcional** (`service-worker.js`)
  - [x] Estratégia de cache basic
  - [x] Offline suportado

- [x] **Interface PWA** 
  - [x] Bloco de notas funcional
  - [x] Estatísticas (palavras, caracteres, links, imagens)
  - [x] Criação/exclusão/edição de notas
  - [x] Download em TXT
  - [x] Seletor de cor da borda

### 2. Backend/API ✅ (25%)
- [x] **API Express rodando**
  - [x] Endpoint `/api/hello` ✅
  - [x] Endpoint `/api/data` (básico)
  - [x] Docker funcionando
  - [x] Porta 3000 respondendo

- [x] **Conectividade Web ↔ API**
  - [x] PWA consome API (fetch de conectividade)
  - [x] Rede Docker Compose conectada

### 3. Containers ✅ (15%)
- [x] **Dockerfiles funcionais**
  - [x] `pwa/app/web/Dockerfile` (serve no Playwright)
  - [x] `pwa/app/api/Dockerfile` (Node Express)
  - [x] `pwa/Dockerfile.e2e` (Playwright)

- [x] **Docker Compose orquestrando**
  - [x] 3 serviços: `web`, `api`, `e2e`
  - [x] Network `app-network` funcionando
  - [x] Volumes e bind mounts OK
  - [x] `docker-compose up` reprodutível ✅

### 4. Testes ✅ (15%)
- [x] **E2E com Playwright**
  - [x] `pwa/tests/api.spec.js` - testa `/api/hello`
  - [x] `pwa/tests/e2e.spec.js` - testa carregamento PWA
  - [x] Testes **passando** ✅ (2/2)
  - [x] Relatório disponível

- [x] **Execução local**
  - [x] `docker-compose run --build e2e` funciona

### 5. CI/CD Parcial ✅ (10%)
- [x] **GitHub Actions workflow**
  - [x] Arquivo em `.github/workflows/ci.yml` ✅
  - [x] Triggers: push e pull_request
  - [x] Build, testes e upload de artefatos
  - [x] Relatório Playwright publicado

- [x] **Artefatos no CI**
  - [x] Upload de `playwright-report`
  - [x] Upload de `extension-zip`

---

## ❌ FALTANDO / INCOMPLETO (30%)

### 1. PWA Avançado — Lighthouse & Performance ❌
**Prioridade: ALTA**

- [ ] **Relatório Lighthouse no CI**
  - [ ] Adicionar `@lhci/cli` ao workflow
  - [ ] Gerar relatório de Performance/PWA/Accessibility/SEO
  - [ ] Validar score ≥ 80 em cada categoria
  - [ ] Upload de relatório HTML

- [ ] **Otimizações PWA**
  - [ ] Validar se service worker atualiza corretamente (versioning)
  - [ ] Testar cache offline completo
  - [ ] Validar installability (manifest + HTTPS no GitHub Pages)

**Ação**: 
```bash
# Instalar Lighthouse CI
npm install -g @lhci/cli

# Ou no workflow adicionar:
- name: Lighthouse CI
  run: npx @lhci/cli autorun
```

---

### 2. Backend — Endpoints Completos ❌
**Prioridade: MÉDIA**

- [ ] **Expandir API com endpoints úteis**
  - Atualmente: apenas `/api/hello` e `/api/data` (mocks)
  - [ ] Integrar com API pública (OpenWeatherMap, PokéAPI, ViaCEP, etc.)
  - [ ] Ou implementar endpoints com regra de negócio real
  - [ ] Validação de entrada (middleware express-validator)
  - [ ] Tratamento de erros (try/catch, status codes)

**Exemplo de endpoint úteis**:
```javascript
// Exemplo: buscar dados de um Pokemon
app.get('/api/pokemon/:name', async (req, res) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

- [ ] **Documentação da API**
  - [ ] README com endpoints, parâmetros, respostas esperadas
  - [ ] Swagger/OpenAPI (opcional, mas bônus)

---

### 3. Publicação no GitHub Pages ❌
**Prioridade: ALTA**

- [ ] **Deploy PWA em `gh-pages`**
  - [ ] Workflow já tenta fazer deploy (verificar se está funcionando)
  - [ ] Validar se PWA está acessível em: `https://<user>.github.io/<repo>/`
  - [ ] Testar installability (Add to Home Screen)
  - [ ] Validar HTTPS funcionando

**Ação**: 
```bash
# Após merge em main, workflow deve:
1. Rodar testes
2. Build PWA
3. Deploy para gh-pages
4. Publicar em GitHub Pages automaticamente
```

---

### 4. Documentação — README Completo ❌
**Prioridade: ALTA**

- [ ] **README.md estruturado**
  - [ ] Descrição geral do projeto (PWA + API + Docker)
  - [ ] Requisitos (Node 20+, Docker, etc.)
  - [ ] Como rodar localmente:
    ```bash
    docker-compose up
    # Abrir http://localhost:8080
    ```
  - [ ] Endpoints da API (tabela ou lista)
  - [ ] Como correr testes:
    ```bash
    docker-compose run --build e2e
    ```
  - [ ] Como publicar em GitHub Pages
  - [ ] Arquitetura do projeto (diagrama ou descrição)
  - [ ] Contribuindo (commits convencionais, branches)
  - [ ] Screenshots/GIF mostrando funcionalidades
  - [ ] Link para PWA publicado
  - [ ] Link para última execução do CI

---

### 5. Melhorias no PWA ❌
**Prioridade: MÉDIA**

- [ ] **Funcionalidades adicionais**
  - [ ] Integrar dados da API no PWA (não apenas teste de conectividade)
  - [ ] Exemplo: buscar dados de Pokemon, clima, etc.
  - [ ] Armazenar dados em IndexedDB (persistência offline melhor)
  - [ ] Implementar atualização de SW (new version available)

- [ ] **UX/Acessibilidade**
  - [ ] Validar ARIA labels
  - [ ] Testar navegação por teclado
  - [ ] Validar contraste de cores (AA no mínimo)
  - [ ] Testar em mobile (responsividade)

---

### 6. CI/CD Melhorias ❌
**Prioridade: MÉDIA**

- [ ] **Validações adicionais no workflow**
  - [ ] Linting (ESLint)
  - [ ] Formatação (Prettier)
  - [ ] Testes unitários (Jest) — opcional mas bônus

- [ ] **Badge de status no README**
  ```markdown
  ![CI Status](https://github.com/.../workflows/CI/badge.svg)
  ```

- [ ] **Validar deploy automático do PWA**
  - [ ] Verificar se workflow de GitHub Pages está ativado nas settings
  - [ ] Confirmar que PWA está em `gh-pages` branch

---

### 7. Testes — Cobertura Completa ❌
**Prioridade: BAIXA**

- [ ] **E2E mais robusto**
  - [ ] Testes de funcionalidades PWA (criar nota, editar, deletar)
  - [ ] Teste de offline
  - [ ] Teste de consumo da API de verdade (não apenas /hello)

- [ ] **Unitários (opcional mas bônus)**
  - [ ] Testes Jest para funções do main.js
  - [ ] Testes da API (supertests)

---

### 8. Integrações Extras (Bônus) 🎁
**Prioridade: BAIXA**

- [ ] **Relatório Lighthouse com histórico**
  - [ ] Usar LHCI com servidor de histórico
  - [ ] Comparar scores entre execuções

- [ ] **Análise de segurança**
  - [ ] SAST (npm audit, Snyk)
  - [ ] Verificar dependências desatualizadas

- [ ] **Vídeo/GIF de demonstração**
  - [ ] Mostrar instalação do PWA
  - [ ] Fluxo de criação/edição de notas
  - [ ] Offline funcionando
  - [ ] Upload em seção "Releases"

---

## 🎯 Plano de Ação Recomendado

### Fase 1: **CRÍTICO** (próximas 1-2 horas)
1. ✅ Publicar PWA em GitHub Pages (ja tem workflow, validar)
2. ❌ Completar README com instruções claras
3. ❌ Adicionar Lighthouse CI ao workflow
4. ❌ Testar instalability do PWA em mobile

### Fase 2: **IMPORTANTE** (próximas 2-3 horas)
5. ❌ Expandir endpoints da API (integrar com API pública real)
6. ❌ Integrar dados da API no PWA (não apenas teste de conectividade)
7. ❌ Melhorar testes E2E (testar fluxo completo)

### Fase 3: **DESEJÁVEL** (se houver tempo)
8. ❌ Adicionar testes unitários (Jest)
9. ❌ Melhorar acessibilidade
10. ❌ Criar vídeo/GIF de demonstração

---

## 📋 Requisitos de Entrega (Checklist Final)

**Enviar ao final:**
- [ ] Link do repositório (com web/api, Dockerfiles, Compose, workflows)
- [ ] Link do PWA publicado no GitHub Pages
- [ ] Link da última execução do CI (Actions)
- [ ] README.md completo com arquitetura, como rodar, endpoints, testes
- [ ] Vídeo/GIF mostrando instalação e fluxo (≤ 3 min)
- [ ] Artefatos (relatório Playwright, Lighthouse)

---

## 💯 Estimativa de Pontuação Atual

| Item | % | Status | Pontos |
|------|---|--------|--------|
| PWA | 30% | 80% ✅ | 24/30 |
| API/Backend | 25% | 70% ✅ | 17.5/25 |
| Containers | 15% | 100% ✅ | 15/15 |
| Testes | 15% | 90% ✅ | 13.5/15 |
| CI/CD | 10% | 80% ✅ | 8/10 |
| Documentação | 5% | 20% ❌ | 1/5 |
| **TOTAL** | **100%** | **73.5%** | **78.5/100** |

**Para 90+/100**: Completar documentação, Lighthouse CI, endpoints reais da API, publicar em GitHub Pages.

---

