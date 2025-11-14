FROM node:20-alpine
WORKDIR /app

# Copia o package.json e instala o 'serve'
COPY package*.json ./
RUN npm ci --omit=dev

# Copia todo o seu PWA (HTML, CSS, JS, icons, etc)
COPY . .

# Expõe a porta 80, que o 'serve' estará ouvindo
EXPOSE 80

# Roda o script "start" (que é 'serve -s . -l 80')
CMD ["npm", "start"]
