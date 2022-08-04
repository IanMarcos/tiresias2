import { extractSqlError } from '../helpers/sql-helpers.js';

class Dao {
  /**
  * Creates a new record in the given table and returns it's id.
  * @param {Model} Model - Instance of an objection.js model.
  * @param {Object} args - Arguments to perform the queries.
  * @param {string} args.name - Name of the entity to be created.
  * @param {string} [args.errCode] - Error code to be displayed.
  */
  static async create(Model, { name, errCode = 'EDA00' }) {
    try {
      return await Model.query().insert({ nombre: name });
    } catch (error) {
      const erroMsg = extractSqlError(error) || errCode;
      throw new Error(erroMsg);
    }
  }

  /**
  * Looks in the given table for a record by name and returns it's id.
  * @param {Model} Model - Instance of an objection.js model.
  * @param {Object} args - Arguments to perform the queries.
  * @param {string} args.name - Name of the entity to be searched.
  * @param {string} [args.errCode] - Error code to be displayed.
  */
  static async getByName(Model, { name, errCode = 'EDA00' }) {
    try {
      const [record] = await Model.query()
        .where('nombre', name);
      return record;
    } catch (error) {
      const erroMsg = extractSqlError(error) || errCode;
      throw new Error(erroMsg);
    }
  }
}

export default Dao;
