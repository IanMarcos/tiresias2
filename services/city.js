import { City, Country } from '../models/index.js';
import { CityDAO } from '../dao/index.js';
import CountryService from './country.js';
import { isDefined } from '../helpers/utils.js';

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
   * @param {Object} args - Arguments requiered for the queries.
   * @param {string} args.name - Name of the city to be searched/created.
   * @param {string} args.country - City's country. Can be a name or 2 characters code.
   */
  async getCityId({ name, country }) {
    const countryService = new CountryService(this.#countryModelInstance);
    try {
      const countryCode = await countryService.getCountryCode({ country });
      const cities = await CityDAO.getByName(this.#modelInstance, name);

      const foundCity = cities.find((city) => city.paisCodigo === countryCode);
      if (isDefined(foundCity)) {
        return foundCity.id;
      }

      // At this point, the city doesn't exist yet
      const newCity = await CityDAO.create(this.#modelInstance, {
        name,
        countryCode,
      });
      return newCity.id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default CityService;
