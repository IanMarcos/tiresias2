import { Model, snakeCaseMappers } from 'objection';

class Transaction extends Model {
  static get tableName() {
    return 'Transaccion';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

export default Transaction;
