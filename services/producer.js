const { Productora } = require('../models');
const { ProductoraDAO } = require('../dao');

class ProducerService {
  #modelInstance;

  constructor(ProductoraInstance = Productora) {
    this.#modelInstance = ProductoraInstance;
  }

  /**
  * Checks whether a producer exists, if it does, returns its ID.
  * If not, it creates it and returns its ID
  * @param {Object} args - Arguments to perform the queries.
  * @param {string} args.name - Name of the producer to be searched/created.
  */
  async getProducerId({ name }) {
    try {
      const producer = await ProductoraDAO.getByName(this.#modelInstance, { name, errCode: 'EDA04' });
      if (producer) {
        return producer.id;
      }
      const newProducer = await ProductoraDAO.create(this.#modelInstance, { name, errCode: 'EDA04' });
      return newProducer.id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ProducerService;
