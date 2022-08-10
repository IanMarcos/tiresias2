import { ProductionState } from '../models/index.js';
import { ProductionStateDAO } from '../dao/index.js';

class ProductionStateService {
  #modelInstance;

  constructor(productioStateInstance = ProductionState) {
    this.#modelInstance = productioStateInstance;
  }

  /**
   * Checks whether a publisher exists, if it does, returns its ID.
   * @param {Object} args - Arguments to perform the queries.
   * @param {string} args.name - Name of the state to be searched.
   */
  async getProductionStateId({ name }) {
    try {
      const state = await ProductionStateDAO.getByName(this.#modelInstance, {
        name,
        errCode: 'EDA08',
      });
      if (state) {
        return state.id;
      }
      throw new Error('Estado de produccion no encontrado/404');
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ProductionStateService;
