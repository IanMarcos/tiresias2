const { EstadoProduccion } = require('../models');
const { EstadoProduccionDAO } = require('../dao');

class ProductionStateService {
  #modelInstance;

  constructor(EstadoProduccionInstance = EstadoProduccion) {
    this.#modelInstance = EstadoProduccionInstance;
  }

  /**
  * Checks whether a publisher exists, if it does, returns its ID.
  * @param {Object} args - Arguments to perform the queries.
  * @param {string} args.name - Name of the state to be searched.
  */
  async verifyProductionState({ name }) {
    try {
      const state = await EstadoProduccionDAO.getByName(this.#modelInstance, { name, errCode: 'EDA08' });
      if (state) {
        return state.id;
      }
      throw new Error('Estado de produccion no encontrado/404');
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ProductionStateService;
