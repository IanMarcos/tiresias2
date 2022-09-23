const User = {
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
};

const UserForm = {
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
      default: 'username',
    },
    role: {
      type: 'string',
      default: 'Basico',
    },
  },
  required: ['username', 'password'],
};

const userUpdateForm = {
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
};

export default { User, UserForm, userUpdateForm };
