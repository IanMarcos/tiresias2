import { RequestDAO, RequestStateDAO } from '../dao/index.js';
import { Request as RequestModel, RequestState } from '../models/index.js';
import { translateKeysToSpanish } from '../helpers/formatters.js';
import logger from '../helpers/loggers.js';

class RequestService {
  static async createRequest(req) {
    try {

      const { id: requestStateId } = await RequestStateDAO.getByName(
        RequestState,
        { name: 'En tramite' }
      );
      req.requestStateId = requestStateId;

      const requestData = translateKeysToSpanish(req);
      const newRequest = await RequestDAO.create(RequestModel, requestData);
      return newRequest.id;
    } catch (error) {
      logger.error(error);
      return { err: error.message };
    }
  }

  static async getAllRequests(limit, page) {
    try {
      const requests = await RequestDAO.getAll(RequestModel, limit, page);
      return requests;
    } catch (error) {
      logger.error(error);
      return { err: error.message };
    }
  }

  static async updateRequest(requestId, req) {
    try {
      const requestData = translateKeysToSpanish(req);
      const updatedRequest = await RequestDAO.update(
        RequestModel,
        requestId,
        requestData
      );
      return updatedRequest;
    } catch (error) {
      logger.error(error);
      return { err: error.message };
    }
  }

  static async getAllRequestsStates() {
    try {
      return await RequestStateDAO.getAll(RequestState, 'EDA16');
    } catch (error) {
      logger.error(error);
      return { err: error.message };
    }
  }

  static async getAllRequestFromUser(uid) {
    try {
      return await RequestDAO.getRequestsByUserId(RequestModel, uid);
    } catch (error) {
      logger.error(error);
      return { err: error.message };
    }
  }
}

export default RequestService;
