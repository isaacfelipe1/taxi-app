import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerDocs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Táxi',
      version: '1.0.0',
      description:
        'Documentação da API para solicitação e gerenciamento de corridas de táxi.',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['src/routes/*.ts'],
});
