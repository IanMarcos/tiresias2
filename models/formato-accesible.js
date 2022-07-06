const { Model } = require('objection');

class FormatoAccesible extends Model {
  static get tableName() {
    return 'FormatoAccesible';
  }
}

module.exports = FormatoAccesible;
