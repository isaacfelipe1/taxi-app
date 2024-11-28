FROM node:22
WORKDIR /app

RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

RUN npx prisma generate

COPY . .
RUN npm run build
EXPOSE 8080

CMD ["node", "dist/index.js"]
