
```markdown
# Guia para Rodar o Projeto 

## Configuração do Ambiente

    -Copie o arquivo `.env.example` e renomeie-o para `.env`:

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

## Solução de Problemas

### Problema: Portas em uso 
   - Certifique-se de que as portas necessárias ( `80`, `8080`) não estão sendo usadas por outros serviços
---