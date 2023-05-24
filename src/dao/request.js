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

  /**
   * Gets all requests, performing join operations with other tables, including many to many relations.
   * @param {Model} Request - Instance of an objection.js model.
   * @param {Number} id - Material's id
   */
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

  /**
   * Gets a Request. Performs join operations with other tables, including many to many relations.
   * @param {Model} Request - Instance of an objection.js model.
   * @param {Number} id - Request's id
   */
  static async getById(Request, id) {
    try {
      return await Request.query()
        .findById(id)
        .select('Solicitud.*', 'Usuario.nombre AS usuario')
        .join('Usuario', 'Solicitud.usuario_id', 'Usuario.id')
        .withGraphFetched('estadoSolicitud')
        .withGraphFetched('formatoAccesible');
    } catch (error) {
      logger.error(error);
      const erroMsg = extractSqlError(error) || 'EDA01';
      throw new Error(erroMsg);
    }
  }

  /**
   * Gets a request without performing join operations with other tables
   * @param {Model} Request - Instance of an objection.js model.
   * @param {Number} id
   */
  static async getByIdNoJoins(Request, id) {
    try {
      return await Request.query().findById(id);
    } catch (error) {
      logger.error(error);
      const erroMsg = extractSqlError(error) || 'EDA01';
      throw new Error(erroMsg);
    }
  }

  /**
   * Gets requests by user id. Performs join operations with other tables, including many to many relations.
   * @param {Model} Request - Instance of an objection.js model.
   * @param {Number} uid - user's uid
   */
  static async getRequestsByUserId(Request, uid) {
    try {
      return await Request.query()
        .select('Solicitud.*', 'FormatoAccesible.nombre AS formatoAccesible')
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
