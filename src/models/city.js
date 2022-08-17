import { Model, snakeCaseMappers } from 'objection';

class City extends Model {
  static get tableName() {
    return 'Ciudad';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

export default City;
