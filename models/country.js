const { Model } = require('objection');

class Country extends Model {
  static get tableName() {
    return 'Pais';
  }
}

module.exports = Country;
