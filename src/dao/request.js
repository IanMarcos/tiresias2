import logger from '../helpers/loggers.js';
import { extractSqlError } from '../helpers/sql-helpers.js';

class RequestDAO {
  /**
   * Logs a request creation or modification in the Request table.
   * @param {Model} Request - Instance of an objection.js model.
   * @param {Object} args - Arguments to crete the Request.
   */
  static async create(Request, requestData) {
    try {
      return await Request.query().insert(requestData);
    } catch (error) {
      logger.error(error);
      const erroMsg = extractSqlError(error) || 'EDA15';
      throw new Error(erroMsg);
    }
  }

  /**
   * Updates a Request with the given data.
   * @param {Model} Request - Instance of an objection.js model.
   * @param {Number} id - Id of the Request to be updated
   * @param {Object} requestData - Object containing all Request attributes.
   */
  static async update(Request, id, requestData) {
    try {
      return await Request.query().patch(requestData).findById(id);
    } catch (error) {
      logger.error(error);
      const erroMsg = extractSqlError(error) || 'EDA15';
      throw new Error(erroMsg);
    }
  }

  // TODO: this shit;
  static async getAll(Request, limit, page, errCode = 'EDA15') {
    try {
      return await Request.query()
        .limit(limit)
        .offset(limit * page);
    } catch (error) {
      logger.error(error);
      const erroMsg = extractSqlError(error) || errCode;
      throw new Error(erroMsg);
    }
  }

  // TODO: this other shit;
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
      logger.error(error);
      const erroMsg = extractSqlError(error) || 'EDA01';
      throw new Error(erroMsg);
    }
  }
}

export default RequestDAO;
