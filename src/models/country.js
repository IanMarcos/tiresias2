import { Model } from 'objection';

class Country extends Model {
  static get tableName() {
    return 'Pais';
  }
}

export default Country;
