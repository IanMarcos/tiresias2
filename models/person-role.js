const { Model } = require('objection');

class PersonRole extends Model {
  static get tableName() {
    return 'RolPersona';
  }
}

module.exports = PersonRole;
