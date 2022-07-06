const { Model } = require('objection');

class Pais extends Model {
  static get tableName() {
    return 'Pais';
  }
}

module.exports = Pais;
