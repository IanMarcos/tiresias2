const { Editorial } = require('../models');
const { EditorialDAO } = require('../dao');

class PublisherService {
  #modelInstance;

  constructor(EditorialInstance = Editorial) {
    this.#modelInstance = EditorialInstance;
  }

  /**
  * Checks whether a publisher exists, if it does, returns its ID.
  * If not, it creates it and returns its ID
  * @param {Object} args - Arguments to perform the queries.
  * @param {string} args.name - Name of the publisher to be searched/created.
  */
  async getPublisherId({ name }) { // TODO reconsider this name
    try {
      const publisher = await EditorialDAO.getByName(this.#modelInstance, { name, errCode: 'EDA04' });
      if (publisher) {
        return publisher.id;
      }

      const newPublisher = await EditorialDAO.create(this.#modelInstance, { name, errCode: 'EDA04' });
      return newPublisher.id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = PublisherService;
