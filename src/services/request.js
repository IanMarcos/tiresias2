import RequestDAO from '../dao/request.js';
import RequestModel from '../models/request.js';
import { translateKeysToSpanish } from '../helpers/formatters.js';

class RequestService {
  static async createRequest(req) {
    const requestData = translateKeysToSpanish(req);
    const newRequest = await RequestDAO.create(RequestModel, requestData);
    return newRequest.id;
  }
}

export default RequestService;
