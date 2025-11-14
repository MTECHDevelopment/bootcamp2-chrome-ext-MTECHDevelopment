# Usa a imagem oficial do Playwright, que já inclui o Chromium e suas dependências
FROM mcr.microsoft.com/playwright:v1.56.1-jammy

WORKDIR /app
COPY package*.json ./
RUN npm install --silent

COPY . .
EXPOSE 3000

# Comando padrão ao rodar a imagem, será sobrescrito pelo docker-compose.yml
<<<<<<< HEAD
CMD ["npm","start"]
=======
CMD ["node","index.js"]
>>>>>>> d6e7805 (.)
