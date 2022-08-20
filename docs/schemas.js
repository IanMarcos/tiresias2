const searchedMaterial = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    titulo: {
      type: 'string',
    },
    edicion: {
      type: 'string',
    },
    añoPublicacion: {
      type: 'string',
    },
    editorial: {
      type: 'string',
    },
    autores: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Person',
      },
    },
    contribuidores: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Person',
      },
    },
    narrador: {
      $ref: '#/components/schemas/Person',
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

const MaterialForm = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    author: {
      type: 'string',
    },
    isbn: {
      type: 'string',
    },
    language: {
      type: 'string',
    },
    format: {
      type: 'string',
    },
    publisher: {
      type: 'string',
    },
    publishCity: {
      type: 'string',
    },
    publishContry: {
      type: 'string',
    },
    publishYear: {
      type: 'string',
    },
    producer: {
      type: 'string',
    },
    productionCity: {
      type: 'string',
    },
    productionCountry: {
      type: 'string',
    },
    materialFile: {
      type: 'file',
    },
    productionState: {
      type: 'string',
      default: 'Disponible',
      pattern: /(Disponible|En Curso)/,
    },
    edition: {
      type: 'string',
    },
    contributor: {
      type: 'string',
    },
    recipients: {
      type: 'string',
    },
    category: {
      type: 'string',
    },
    narrator: {
      type: 'string',
    },
    duration: {
      type: 'string',
    },
    resume: {
      type: 'string',
    },
  },
  required: [
    'title',
    'author',
    'isbn',
    'language',
    'format',
    'publisher',
    'publishCity',
    'publishContry',
    'publishYear',
    'producer',
    'productionCity',
    'productionCountry',
    'materialFile',
    'editorial',
    'estadoProduccion',
  ],
};

const Material = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    titulo: {
      type: 'string',
    },
    edicion: {
      type: 'string',
      nullabe: true,
    },
    isbn: {
      type: 'integer',
    },
    idiomaCodigo: {
      type: 'string',
    },
    añoPublicacion: {
      type: 'integer',
    },
    añoProduccion: {
      type: 'integer',
    },
    destinatarios: {
      type: 'string',
      nullabe: true,
    },
    duracion: {
      type: 'string',
      nullabe: true,
    },
    tamañoFichero: {
      type: 'integer',
    },
    resumen: {
      type: 'string',
      nullabe: true,
    },
    urlArchivo: {
      type: 'string',
    },
    formatoAccesible: {
      type: 'string',
    },
    editorial: {
      type: 'string',
    },
    estadoProduccion: {
      type: 'string',
    },
    ciudadPublicacion: {
      $ref: '#/components/schemas/City',
    },
    ciudadProduccion: {
      $ref: '#/components/schemas/City',
    },
    autores: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Person',
      },
    },
    contribuidores: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Person',
      },
    },
    narrador: {
      $ref: '#/components/schemas/Person',
      nullabe: true,
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

const signInForm = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  required: ['username', 'password'],
};

const failedRequest = {
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
};

export default {
  searchedMaterial,
  Person,
  City,
  User,
  UserForm,
  userUpdateForm,
  Material,
  MaterialForm,
  signInForm,
  failedRequest,
};
