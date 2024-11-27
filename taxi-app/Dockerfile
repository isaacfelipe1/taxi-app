FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22
WORKDIR /app
COPY --from=builder /app .
ENV PORT=80  
CMD ["npm", "run", "start", "--", "-p", "80"]
EXPOSE 80
