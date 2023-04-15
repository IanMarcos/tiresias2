import logger from '../helpers/loggers.js';
import { extractSqlError } from '../helpers/sql-helpers.js';

class MaterialCategoryDAO {
  /**
   * Creates a new record in the PersonaMaterial table and returns it.
   * @param {Model} MaterialCategory - Instance of an objection.js model.
   * @param {Object} args - Arguments to perform the queries.
   * @param {string} args.categoryId
   * @param {string} args.materialId
   */
  static async create(MaterialCategory, { categoryId, materialId }) {
    try {
      return await MaterialCategory.query().insert({
        categoriaId: categoryId,
        materialId,
      });
    } catch (error) {
      logger.error(error);
      const erroMsg = extractSqlError(error) || 'EDA13';
      throw new Error(erroMsg);
    }
  }
}

export default MaterialCategoryDAO;
