const Dao = require('./dao');
const { extractSqlError } = require('../helpers/sql-helpers');

class PaisDAO extends Dao {
  /**
  * Checks if the provided country exist in the data base.
  * @param {Model} Model - Instance of objection.js model for 'Pais'.
  * @param {Object} args - Arguments to perform the queries.
  * @param {string} args.code - Country's two character code.
  */
  static async doesExist(Pais, { code }) {
    try {
      const [country] = await Pais.query()
        .where('codigo', code);
      if (!country) return false;
      return true;
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA05';
      throw new Error(erroMsg);
    }
  }
}

module.exports = PaisDAO;
