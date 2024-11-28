# Guia para Rodar o Projeto

## Passo 1: Clonar o Repositório
Clone o repositório para a sua máquina local utilizando o seguinte link:

[https://github.com/isaacfelipe1/taxi-app.git](https://github.com/isaacfelipe1/taxi-app.git)

```bash
git clone https://github.com/isaacfelipe1/taxi-app.git
```

# Configure as variáveis de ambiente no arquivo `.env`:
   - Abra o arquivo `.env` e substitua os valores pelos valores apropriados.
   - Exemplo:
     GOOGLE_API_KEY=" sua chave do  API Routes"
# Verifique se o Docker e o Docker Compose estão instalados:
   - Docker:
     ```bash
     docker --version
     ```
   - Docker Compose:
     ```bash
     docker-compose --version
     ```
## Rodar o Ambiente

### Suba os serviços com o Docker Compose:**
   - Certifique-se de estar na raiz do projeto (onde está o arquivo `docker-compose.yml`) e execute:
     ```bash
     docker-compose up
     ```
   - Este comando irá:
     - Construir as imagens.
     - Criar e iniciar os contêineres definidos no arquivo `docker-compose.yml`.

## Acesse os serviços:
   - Frontend: Abra o navegador e acesse `http://localhost:80`.
   - Backend (API): Acesse `http://localhost:8080`.
## teste a aplicação no swagger ou pela interface
   
  - ID: 123
  - origin: Avenida Paulista, 1000, São Paulo, SP
  - destination: Praça da Sé, São Paulo, SP

## Solução de Problemas

### Problema: Portas em uso 
   - Certifique-se de que as portas necessárias ( `80`, `8080`) não estão sendo usadas por outros serviços
  

---