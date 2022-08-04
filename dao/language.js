import Dao from './dao.js';
import { extractSqlError } from '../helpers/sql-helpers.js';

class LanguageDAO extends Dao {
  /**
  * Checks if the provided country exist in the data base.
  * @param {Model} Language - Instance of objection.js model for 'Idioma'.
  * @param {Object} args - Arguments to perform the queries.
  * @param {string} args.code - Country's two character code.
  */
  static async doesExist(Language, { code }) {
    try {
      const [country] = await Language.query()
        .where('codigo', code);
      if (!country) return false;
      return true;
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA10';
      throw new Error(erroMsg);
    }
  }
}

export default LanguageDAO;
