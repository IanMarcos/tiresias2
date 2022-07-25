const { Country } = require('../models');
const { CountryDAO } = require('../dao');

class CountryService {
  #modelInstance;

  constructor(countryInstance = Country) {
    this.#modelInstance = countryInstance;
  }

  /**
  * Checks whether a country exists, if it does, returns its code.
  * @param {Object} args - Arguments to perform the queries.
  * @param {string} args.country - May be a name or a two characters code.
  */
  async getCountryCode({ country }) {
    try {
      if (country.length === 2) {
        // Buscar por código
        const exists = await CountryDAO.doesExist(this.#modelInstance, { code: country });
        if (exists) {
          return country.toUpperCase();
        }
      } else {
        // Busca por nombre
        const result = await CountryDAO.getByName(this.#modelInstance, { name: country, errCode: 'EDA05' });
        if (result) return result.codigo;
      }
      throw new Error('Pais no encontrado/404');
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CountryService;
