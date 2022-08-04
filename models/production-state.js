import { Model } from 'objection';

class ProductionState extends Model {
  static get tableName() {
    return 'EstadoProduccion';
  }
}

export default ProductionState;
