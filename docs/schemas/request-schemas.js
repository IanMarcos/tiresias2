const RequestForm = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    author: {
      type: 'string',
    },
    accessibleFormatId: {
      type: 'integer',
    },
    publisher: {
      type: 'string',
    },
    publishYear: {
      type: 'integer',
    },
    edition: {
      type: 'integer',
    },
    volume: {
      type: 'integer',
    },
    requestStateId: {
      type: 'integer',
    },
    textPart: {
      type: 'string',
    },
    observations: {
      type: 'string',
    },
    stateNote: {
      type: 'string',
    },
    languageCode: {
      type: 'string',
    },
  },
  required: [
    'title',
  ],
};

const Request = {
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
    volumen: {
      type: 'string',
    },
    autor: {
      type: 'string',
    },
    parteTexto: {
      type: 'string',
    },
    formatoAccesibleId: {
      type: 'integer',
    },
    anioPublicacion: {
      type: 'integer',
    },
    editorial: {
      type: 'string',
    },
    idiomaCodigo: {
      type: 'string',
    },
    observaciones: {
      type: 'string',
    },
    usuarioId: {
      type: 'integer',
    },
    fecha: {
      type: 'string',
    },
    estadoSolicitudId: {
      type: 'integer',
    },
    fechaEstado: {
      type: 'string',
    },
    notaEstado: {
      type: 'string',
    },
  },
}

export default { Request, RequestForm };