import Dao from './dao.js';
import logger from '../helpers/loggers.js';
import { extractSqlError } from '../helpers/sql-helpers.js';

class PersonDAO extends Dao {
  static async create(PersonModel, { names, lastName }) {
    try {
      return await PersonModel.query().insert({
        apellido: lastName,
        nombres: names,
      });
    } catch (error) {
      logger.error(error);
      const erroMsg = extractSqlError(error) || 'EDA01';
      throw new Error(erroMsg);
    }
  }

  static async getByName(PersonModel, { names, lastName }) {
    try {
      const [person] = await PersonModel.query()
        .where('nombres', names)
        .where('apellido', lastName);
      return person;
    } catch (error) {
      logger.error(error);
      const erroMsg = extractSqlError(error) || 'EDA09';
      throw new Error(erroMsg);
    }
  }
}

export default PersonDAO;
