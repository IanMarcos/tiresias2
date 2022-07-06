const { Model } = require('objection');

class Productora extends Model {
  static get tableName() {
    return 'Productora';
  }
}

module.exports = Productora;
