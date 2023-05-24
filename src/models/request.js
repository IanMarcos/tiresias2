import { Model, snakeCaseMappers } from 'objection';
import RequestState from './request-state.js';
import User from './user.js';
import AccesibleFormat from './accesible-format.js';

class Request extends Model {
  static get tableName() {
    return 'Solicitud';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get relationMappings() {
    return {
      estadoSolicitud: {
        relation: Model.BelongsToOneRelation,
        modelClass: RequestState,
        join: {
          from: 'Solicitud.estado_solicitud_id',
          to: 'EstadoSolicitud.id',
        },
      },
      formatoAccesible: {
        relation: Model.BelongsToOneRelation,
        modelClass: AccesibleFormat,
        join: {
          from: 'Solicitud.formato_accesible_id',
          to: 'FormatoAccesible.id',
        },
      },
    };
  }
}

export default Request;
