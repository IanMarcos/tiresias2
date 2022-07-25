const { City, Country } = require('../models');
const { CityDAO } = require('../dao');
const CountryService = require('./country');

class CityService {
  #modelInstance;

  #countryModelInstance;

  constructor(cityInstance = City, countryInstance = Country) {
    this.#modelInstance = cityInstance;
    this.#countryModelInstance = countryInstance;
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
      const city = await CityDAO.getByName(this.#modelInstance, { name, errCode: 'EDA06' });
      if (city) {
        return city.id;
      }

      const countryCode = await countryService.getCountryCode({ country });
      const newCity = await CityDAO.create(this.#modelInstance, { name, countryCode });
      return newCity.id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CityService;
