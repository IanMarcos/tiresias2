import { Model } from 'objection';

class TransactionType extends Model {
  static get tableName() {
    return 'TipoTransaccion';
  }
}

export default TransactionType;