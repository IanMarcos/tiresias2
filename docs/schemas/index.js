import materialSchemas from './material-schemas.js';
import userSchemas from './user-schemas.js';
import errorSchemas from './error-schemas.js';
import authSchemas from './auth-schemas.js';

const baseObject = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    nombre: {
      type: 'string',
    },
  },
};

const Person = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    apellido: {
      type: 'string',
    },
    nombres: {
      type: 'string',
    },
  },
};

const City = {
  type: 'object',
  properties: {
    nombre: {
      type: 'string',
    },
    paisCodigo: {
      type: 'string',
    },
  },
};

const Language = {
  type: 'object',
  properties: {
    codigo: {
      type: 'string',
    },
    nombre: {
      type: 'string',
    },
  },
};

export default {
  ...materialSchemas,
  ...userSchemas,
  ...errorSchemas,
  ...authSchemas,
  baseObject,
  Person,
  City,
  Language,
};
