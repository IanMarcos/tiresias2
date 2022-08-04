import Dao from './dao.js';
import { extractSqlError } from '../helpers/sql-helpers.js';

class CountryDAO extends Dao {
  /**
  * Checks if the provided country exist in the data base.
  * @param {Model} Country - Instance of objection.js model for 'Pais'.
  * @param {Object} args - Arguments to perform the queries.
  * @param {string} args.code - Country's two character code.
  */
  static async doesExist(Country, { code }) {
    try {
      const [country] = await Country.query()
        .where('codigo', code);
      if (!country) return false;
      return true;
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA05';
      throw new Error(erroMsg);
    }
  }
}

export default CountryDAO;
