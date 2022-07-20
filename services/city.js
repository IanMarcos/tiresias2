const { Ciudad, Pais } = require('../models');
const { CiudadDAO } = require('../dao');
const CountryService = require('./country');

class CityService {
  #modelInstance;

  #countryModelInstance;

  constructor(CiudadInstance = Ciudad, PaisInstance = Pais) {
    this.#modelInstance = CiudadInstance;
    this.#countryModelInstance = PaisInstance;
  }

  /**
  * Checks whether a city exists, if it does, returns its ID.
  * If not, it creates it and returns its ID
  * @param {Object} args - Objection Models requiered for the queries.
  * @param {string} args.name - Name of the city to be searched/created.
  * @param {string} args.country - City's country. Can be a name or 2 characters code.
  */
  async getCityId({ name, country }) {
    const countryService = new CountryService(this.#countryModelInstance);
    try {
      const city = await CiudadDAO.getByName(this.#modelInstance, { name, errCode: 'EDA06' });
      if (city) {
        return city.id;
      }

      const countryCode = await countryService.getCountryCode({ country });
      const newCity = await CiudadDAO.create(this.#modelInstance, { name, countryCode });
      return newCity.id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CityService;
