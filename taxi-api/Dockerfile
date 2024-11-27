FROM node:22

# Defina o diretório de trabalho
WORKDIR /app

# Instale o cliente PostgreSQL necessário para pg_isready
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Copie os arquivos de dependência e instale os pacotes do Node.js
COPY package*.json ./
RUN npm install

# Copie o restante do código e construa o projeto
COPY . .
RUN npm run build

# Exponha a porta 8080 para o container
EXPOSE 8080

# Defina o comando para iniciar a aplicação
CMD ["node", "dist/index.js"]
