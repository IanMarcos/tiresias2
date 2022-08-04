import { Model } from 'objection';

class PersonRole extends Model {
  static get tableName() {
    return 'RolPersona';
  }
}

export default PersonRole;
