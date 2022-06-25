const { Model } = require('objection');

class RolPersona extends Model {
  static get tableName(){
    return 'RolPersona';
  }
}

module.exports = RolPersona;
