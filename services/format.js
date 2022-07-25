const { AccesibleFormat } = require('../models');
const { AccesibleFormatDAO } = require('../dao');

class FormatService {
  #modelInstance;

  constructor(accesibleFormatInstance = AccesibleFormat) {
    this.#modelInstance = accesibleFormatInstance;
  }

  /**
  * Checks whether the passed format exists, if it does, returns its id.
  * @param {Object} args - Arguments to perform the queries.
  * @param {string} args.name - Name of the format to be searched.
  */
  async getFormatId({ name }) {
    try {
      const format = await AccesibleFormatDAO
        .getByName(this.#modelInstance, { name, errCode: 'EDA07' });

      if (format) return format.id;
      throw new Error('Formato no encontrado/404');
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = FormatService;
