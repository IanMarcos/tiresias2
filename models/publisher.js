import { Model } from 'objection';

class Publisher extends Model {
  static get tableName() {
    return 'Editorial';
  }
}

export default Publisher;
