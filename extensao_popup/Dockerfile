# Base Playwright (Chromium já incluído)
FROM mcr.microsoft.com/playwright:v1.46.0-jammy

# Define o diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm ci --silent

# Nota: mcr.microsoft.com/playwright:v1.46.0-jammy já inclui Chromium
# Não é necessário instalar novamente com npx playwright install

# Instala X virtual framebuffer para permitir execução de browsers em modo headful
# e dbus para evitar erros relacionados a conexão D-Bus
RUN apt-get update \
	&& apt-get install -y --no-install-recommends xvfb dbus-x11 \
	&& rm -rf /var/lib/apt/lists/*

# Copia todo o código fonte
COPY . .

# Build da extensão para dist/
RUN node scripts/build-extension.mjs

# Comando padrão: executar testes
CMD ["npm", "test"]
