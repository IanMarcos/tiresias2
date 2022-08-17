import swaggerJSDoc from 'swagger-jsdoc';

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
    schemas: {
      User: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          role: {
            type: 'string',
          },
        },
        required: ['username', 'password'],
      },
      safeUser: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          nombre: {
            type: 'string',
          },
          nombreUsuario: {
            type: 'string',
          },
          rol: {
            type: 'string',
          },
        },
      },
      UsersList: {
        type: 'object',
        properties: {
          results: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/safeUser',
            },
          },
        },
      },
      newUser: {
        type: 'object',
        properties: {
          results: {
            type: 'object',
            properties: {
              user: {
                type: 'object',
                properties: {
                  uid: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
      userUpdateForm: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          role: {
            type: 'string',
          },
        },
      },
      failedRequest: {
        type: 'object',
        properties: {
          results: {
            type: 'object',
            properties: {
              err: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

export default swaggerJSDoc(swaggerOptions);
