const { Model } = require('objection');

class AccesibleFormat extends Model {
  static get tableName() {
    return 'FormatoAccesible';
  }
}

module.exports = AccesibleFormat;
