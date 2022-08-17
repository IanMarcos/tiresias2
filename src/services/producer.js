import { Producer } from '../models/index.js';
import { ProducerDAO } from '../dao/index.js';

class ProducerService {
  #modelInstance;

  constructor(producerInstance = Producer) {
    this.#modelInstance = producerInstance;
  }

  /**
   * Checks whether a producer exists, if it does, returns its ID.
   * If not, it creates it and returns its ID
   * @param {Object} args - Arguments to perform the queries.
   * @param {string} args.name - Name of the producer to be searched/created.
   */
  async getProducerId({ name }) {
    try {
      const producer = await ProducerDAO.getByName(this.#modelInstance, {
        name,
        errCode: 'EDA04',
      });
      if (producer) {
        return producer.id;
      }
      const newProducer = await ProducerDAO.create(this.#modelInstance, {
        name,
        errCode: 'EDA04',
      });
      return newProducer.id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ProducerService;
