const Dao = require('./dao');

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
      throw new Error('EDA05');
    }
  }
}

module.exports = PaisDAO;
