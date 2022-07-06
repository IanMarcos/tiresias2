const { Model } = require('objection');

class EstadoProduccion extends Model {
  static get tableName() {
    return 'EstadoProduccion';
  }
}

module.exports = EstadoProduccion;
