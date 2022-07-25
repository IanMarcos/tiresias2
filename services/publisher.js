const { Publisher } = require('../models');
const { PublisherDAO } = require('../dao');

class PublisherService {
  #modelInstance;

  constructor(publisherInstance = Publisher) {
    this.#modelInstance = publisherInstance;
  }

  /**
  * Checks whether a publisher exists, if it does, returns its ID.
  * If not, it creates it and returns its ID
  * @param {Object} args - Arguments to perform the queries.
  * @param {string} args.name - Name of the publisher to be searched/created.
  */
  async getPublisherId({ name }) { // TODO reconsider this name
    try {
      const publisher = await PublisherDAO.getByName(this.#modelInstance, { name, errCode: 'EDA04' });
      if (publisher) {
        return publisher.id;
      }

      const newPublisher = await PublisherDAO.create(this.#modelInstance, { name, errCode: 'EDA04' });
      return newPublisher.id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = PublisherService;
