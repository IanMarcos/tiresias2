import RequestDAO from '../dao/request.js';
import RequestModel from '../models/request.js';
import { translateKeysToSpanish } from '../helpers/formatters.js';

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
      return { err: error.message };
    }
  }
}

export default RequestService;
