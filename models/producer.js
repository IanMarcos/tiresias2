const { Model } = require('objection');

class Producer extends Model {
  static get tableName() {
    return 'Productora';
  }
}

module.exports = Producer;
