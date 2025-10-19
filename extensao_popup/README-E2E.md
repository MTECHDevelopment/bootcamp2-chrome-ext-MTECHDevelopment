# Execução E2E (local com Docker Compose)

Este arquivo descreve como executar a suíte de testes Playwright localmente usando Docker Compose.

Pré-requisitos
- Docker e Docker Compose instalados
- Node.js (opcional para rodar localmente sem container)

1) Build da imagem (constrói imagem Playwright e gera `dist/` na imagem):

```powershell
# no diretório extensao_popup
docker compose build
```

2) Executar os testes dentro do container (gera `playwright-report` dentro do container e artefatos no volume):

```powershell
# roda o serviço e2e e exibe saída
docker compose run --rm e2e
```

3) Se desejar abrir o relatório HTML gerado pelo Playwright (local):

```powershell
# se o relatório foi gerado localmente, abra:
npx playwright show-report
```

Notas
- O `docker-compose.yml` utiliza um volume nomeado `node_modules` para evitar que o `node_modules` da imagem seja sobrescrito ao montar o diretório do host.
- Se os testes necessitarem executar em modo headful, o `command` já chama `xvfb-run` para prover um display virtual.

CI
- O workflow `.github/workflows/ci.yml` já instala dependências, executa `npx playwright install --with-deps chromium`, faz o build (`npm run build`) e roda os testes com `xvfb-run`.
- Artefatos (playwright-report e dist/extension.zip) são publicados automaticamente pelo workflow.
