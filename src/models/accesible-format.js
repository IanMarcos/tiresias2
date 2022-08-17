import { Model } from 'objection';

class AccesibleFormat extends Model {
  static get tableName() {
    return 'FormatoAccesible';
  }
}

export default AccesibleFormat;
