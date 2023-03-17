import { raw } from 'objection';
import { extractSqlError } from '../helpers/sql-helpers.js';

class MaterialDAO {
  /**
   * Gets a material. Performs join operations with other tables, including many to many relations.
   * @param {Model} Material - Instance of an objection.js model.
   * @param {Number} id - Material's id
   */
  static async getById(Material, id) {
    try {
      return await Material.query()
        .findById(id)
        .select(
          'Material.*',
          'FormatoAccesible.nombre AS formatoAccesible',
          'Editorial.nombre AS editorial',
          'Productora.nombre AS productora',
          'EstadoProduccion.nombre AS estadoProduccion'
        )
        .join(
          'FormatoAccesible',
          'Material.formato_accesible_id',
          'FormatoAccesible.id'
        )
        .join('Editorial', 'Material.editorial_id', 'Editorial.id')
        .join('Productora', 'Material.productora_id', 'Productora.id')
        .join(
          'EstadoProduccion',
          'Material.estado_produccion_id',
          'EstadoProduccion.id'
        )
        .where('eliminado', 0)
        .withGraphFetched('personas')
        .withGraphFetched('ciudadPublicacion')
        .withGraphFetched('ciudadProduccion')
        .withGraphFetched('categorias');
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA01';
      throw new Error(erroMsg);
    }
  }

  /**
   * Gets a material without performing join operations with other tables
   * @param {Model} Material - Instance of an objection.js model.
   * @param {Number} id
   */
  static async getByIdNoJoins(Material, id) {
    try {
      return await Material.query().findById(id);
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA01';
      throw new Error(erroMsg);
    }
  }

  /**
   * Gets all materials, performing join operations with other tables, including many to many relations.
   * @param {Model} Material - Instance of an objection.js model.
   * @param {Number} id - Material's id
   */
  static async getAll(Material, { limit, page }) {
    try {
      return await Material.query()
        .select(
          'Material.*',
          'FormatoAccesible.nombre AS formatoAccesible',
          'Editorial.nombre AS editorial',
          'Productora.nombre AS productora',
          'EstadoProduccion.nombre AS estadoProduccion'
        )
        .join(
          'FormatoAccesible',
          'Material.formato_accesible_id',
          'FormatoAccesible.id'
        )
        .join('Editorial', 'Material.editorial_id', 'Editorial.id')
        .join('Productora', 'Material.productora_id', 'Productora.id')
        .join(
          'EstadoProduccion',
          'Material.estado_produccion_id',
          'EstadoProduccion.id'
        )
        .where('eliminado', 0)
        .withGraphFetched('personas')
        .withGraphFetched('ciudadPublicacion')
        .withGraphFetched('ciudadProduccion')
        .withGraphFetched('categorias')
        .limit(limit)
        .offset(limit * page);
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA11';
      throw new Error(erroMsg);
    }
  }

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
 * Updates a material with the given data.
 * @param {Model} Material - Instance of an objection.js model.
 * @param {Number} id - Id of the material to be updated
 * @param {Object} materialData - Object containing all Material attributes.
 */
  static async update(Material, id, materialData) {
    try {
      return await Material.query().patch(materialData)
        .findById(id);
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
      return await Material.query()
        .findById(id)
        .where('eliminado', 0)
        .patch({ eliminado: 1 });
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA01';
      throw new Error(erroMsg);
    }
  }

  /**
   * Creates a new record in the given table and returns it's id.
   * @param {Model} Material - Instance of an objection.js model.
   * @param {Object} args - Arguments to perform the querie.
   * @param {string} args.searchTerm - String to search in the materials.
   * @param {string} [args.limit] - Number of results per page.
   * @param {string} [args.page] - Page number.
   */
  static async search(Material, { searchTerm, limit = 10, page = 0 }) {
    try {
      const materials = await Material.query()
        .withGraphFetched('personas')
        .select(
          'Material.id',
          'titulo',
          'edicion',
          'anio_publicacion',
          'Editorial.nombre AS editorial'
        )
        .join('Editorial', 'Material.editorial_id', 'Editorial.id')
        .where('eliminado', 0)
        .where(
          raw(
            `MATCH(titulo) AGAINST ('${searchTerm}' IN NATURAL LANGUAGE MODE)`
          )
        )
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
