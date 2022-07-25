const Dao = require('./dao');
const { extractSqlError } = require('../helpers/sql-helpers');

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

module.exports = CountryDAO;
