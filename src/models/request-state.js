import { Model } from 'objection';

class RequestState extends Model {
  static get tableName() {
    return 'EstadoSolicitud';
  }
}

export default RequestState;