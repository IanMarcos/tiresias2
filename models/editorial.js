const { Model } = require('objection');

class Editorial extends Model {
  static get tableName() {
    return 'Editorial';
  }
}

module.exports = Editorial;
