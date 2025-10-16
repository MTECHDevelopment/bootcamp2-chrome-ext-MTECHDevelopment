# Base Playwright (Chromium já incluído)
FROM mcr.microsoft.com/playwright:v1.46.0-jammy

# Define o diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm ci --silent

# Instala navegadores (garantindo Chromium)
RUN npx playwright install --with-deps chromium

# Copia todo o código fonte
COPY . .

# Build da extensão para dist/
RUN node scripts/build-extension.mjs

# Comando padrão: executar testes
CMD ["npm", "test"]
