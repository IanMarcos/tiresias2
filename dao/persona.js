const Dao = require('./dao');
const { extractSqlError } = require('../helpers/sql-helpers');

class PersonaDAO extends Dao {
  static async create(PersonaModel, { names, lastName }) {
    try {
      return await PersonaModel.query().insert({ apellido: lastName, nombres: names });
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA01';
      throw new Error(erroMsg);
    }
  }

  static async getByName(PersonaModel, { names, lastName }) {
    try {
      const [person] = await PersonaModel.query()
        .where('nombres', names)
        .where('apellido', lastName);
      return person;
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA09';
      throw new Error(erroMsg);
    }
  }
}

module.exports = PersonaDAO;
