import { RequestDAO, RequestStateDAO } from '../dao/index.js';
import { Request as RequestModel, RequestState } from '../models/index.js';
import { translateKeysToSpanish } from '../helpers/formatters.js';
import logger from '../helpers/loggers.js';

class RequestService {
  static async createRequest(req) {
    const requestData = translateKeysToSpanish(req);
    const newRequest = await RequestDAO.create(RequestModel, requestData);
    return newRequest.id;
  }

  static async getAllRequests(limit, page) {
    const requests = await RequestDAO.getAll(RequestModel, limit, page);
    return requests;
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
}

export default RequestService;
