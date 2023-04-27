import { Model, snakeCaseMappers } from 'objection';

class Request extends Model {
  static get tableName() {
    return 'Solicitud';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

export default Request;
