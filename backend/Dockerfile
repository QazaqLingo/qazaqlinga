FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Папка для загруженных файлов (аватары, изображения)
RUN mkdir -p uploads/avatars uploads/units

EXPOSE 5000

CMD ["node", "server.js"]
