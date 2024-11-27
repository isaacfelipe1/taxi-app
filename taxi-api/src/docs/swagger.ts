import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerDocs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Táxi',
      version: '1.0.0',
      description: 'Documentação da API para gerenciamento de corridas.',
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === 'production'
            ? 'http://backend:8080'
            : 'http://localhost:8080',
      },
    ],
  },
  apis:
    process.env.NODE_ENV === 'production'
      ? ['dist/routes/*.js']
      : ['src/routes/*.ts'],
});
