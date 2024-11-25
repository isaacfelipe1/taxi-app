
FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build # Build do frontend

FROM node:22
WORKDIR /app
COPY --from=builder /app .
CMD ["npm", "run", "start"]
EXPOSE 3000
