import { Model, snakeCaseMappers } from 'objection';

class User extends Model {
  static get tableName() {
    return 'Usuario';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

export default User;
