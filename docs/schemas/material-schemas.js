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
    productora: {
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
    categorias: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/baseObject',
      },
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

export default { Material, MaterialForm, searchedMaterial };
