import Dao from './dao.js';
import logger from '../helpers/loggers.js';
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
      return await City.query().insert({
        nombre: name,
        paisCodigo: countryCode,
      });
    } catch (error) {
      logger.error(error);
      const erroMsg = extractSqlError(error) || 'EDA06';
      throw new Error(erroMsg);
    }
  }

  /**
   * Looks in the given table for a record by name and returns it's id.
   * @param {Model} Model - Instance of an objection.js model.
   * @param {string} name - Name of the city to be searched.
   */
  static async getByName(Model, name) {
    try {
      return await Model.query().where('nombre', name);
    } catch (error) {
      logger.error(error);
      const erroMsg = extractSqlError(error) || 'EDA06';
      throw new Error(erroMsg);
    }
  }
}

export default CityDAO;
