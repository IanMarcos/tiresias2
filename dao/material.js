import { raw } from 'objection';
import { extractSqlError } from '../helpers/sql-helpers.js';

class MaterialDAO {
  /**
  * Creates a new record in the given table and returns it's id.
  * @param {Model} Material - Instance of an objection.js model.
  * @param {Object} materialData - Object containing all Material attributes.
  */
  static async create(Material, materialData) {
    try {
      return await Material.query().insert(materialData);
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA01';
      throw new Error(erroMsg);
    }
  }

  /**
  * Deletes logically a material.
  * @param {Model} Material - Instance of an objection.js model.
  * @param {string} id
  */
  static async delete(Material, id) {
    try {
      return Material.query().findById(id).patch({ eliminado: 1 });
    } catch (error) {
      throw new Error('EDA01');
    }
  }

  /**
  * Creates a new record in the given table and returns it's id.
  * @param {Model} Material - Instance of an objection.js model.
  * @param {Object} args - Arguments to perform the querie.
  * @param {string} args.searchQuery - String to search in the materials.
  * @param {string} [args.limit] - Number of results per page.
  * @param {string} [args.page] - Page number.
  */
  static async search(Material, { searchQuery, limit = 10, page = 0 }) {
    try {
      const materials = await Material.query()
        .withGraphFetched('personas')
        .select('Material.id', 'titulo', 'edicion', 'año_publicacion', 'Editorial.nombre AS editorial')
        .innerJoin('Editorial', 'Material.editorial_id', 'Editorial.id')
        .where('eliminado', 0)
        .where(raw(`MATCH(titulo) AGAINST ('${searchQuery}' IN NATURAL LANGUAGE MODE)`))
        .limit(limit)
        .offset(limit * page);

      return materials;
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA01';
      throw new Error(erroMsg);
    }
  }
}

export default MaterialDAO;
