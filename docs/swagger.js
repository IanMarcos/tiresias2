import swaggerJSDoc from 'swagger-jsdoc';
import schemas from './schemas/index.js';

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Tiresias 2 API',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:8080/',
      description: 'Development',
    },
    {
      url: 'https://tiresias2.herokuapp.com/',
      description: 'Testing',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas,
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

export default swaggerJSDoc(swaggerOptions);
