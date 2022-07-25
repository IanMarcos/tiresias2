const { Model } = require('objection');

class ProductionState extends Model {
  static get tableName() {
    return 'EstadoProduccion';
  }
}

module.exports = ProductionState;
