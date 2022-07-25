const { Model } = require('objection');

class Publisher extends Model {
  static get tableName() {
    return 'Editorial';
  }
}

module.exports = Publisher;
