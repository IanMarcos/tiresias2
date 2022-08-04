import Dao from './dao.js';
import { extractSqlError } from '../helpers/sql-helpers.js';

class CityDAO extends Dao {
  /**
  * Creates a new record in the given table and returns it's id.
  * @param {Model} City - Instance of objection.js model for 'Ciudad'.
  * @param {Object} args - Arguments to perform the queries.
  * @param {string} args.name - Name of the entity to be created.
  * @param {string} args.countryCode - Country's two character code.
  */
  static async create(City, { name, countryCode }) {
    try {
      return await City.query().insert({ nombre: name, paisCodigo: countryCode });
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA06';
      throw new Error(erroMsg);
    }
  }
}

export default CityDAO;
