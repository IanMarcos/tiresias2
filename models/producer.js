import { Model } from 'objection';

class Producer extends Model {
  static get tableName() {
    return 'Productora';
  }
}

export default Producer;
