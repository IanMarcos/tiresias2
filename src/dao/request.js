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
      const errorMsg = extractSqlError(error) || 'EDA15';
      throw new Error(errorMsg);
    }
  }

  static async getAll(Request, limit, page, errCode = 'EDA15') {
    try {
      return await Request.query()
        .limit(limit)
        .offset(limit * page);
    } catch (error) {
      logger.error(error);
      const errorMsg = extractSqlError(error) || errCode;
      throw new Error(errorMsg);
    }
  }

  static async getById(Request, id) {
    try {
      // TODO: Is this query right?
      return await Request.query()
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
      const errorMsg = extractSqlError(error) || 'EDA15';
      throw new Error(errorMsg);
    }
  }

  static async getRequestsByUserId(Request, uid) {
    try {
      return await Request.query()
        .select(
          'Solicitud.*',
          'FormatoAccesible.nombre AS formatoAccesible'
        )
        .join(
          'FormatoAccesible',
          'Solicitud.formato_accesible_id',
          'FormatoAccesible.id'
        )
        .where('usuario_id', uid);
    } catch (error) {
      logger.error(error);
      const errorMsg = extractSqlError(error) || 'EDA15';
      throw new Error(errorMsg);
    }
  }
}

export default RequestDAO;
