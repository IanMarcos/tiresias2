import RequestService from '../services/request.js';
import {
  formatHTTPResponse,
  formatLimitAndPage,
} from '../helpers/formatters.js';

const createRequest = async (req, res) => {
  const { requester } = req;
  const { body } = req;
  Object.assign(body, { userId: requester.uid });

  const result = await RequestService.createRequest(body);
  const { results, statusCode } = formatHTTPResponse(201, result);

  return res.status(statusCode).json({ results });
};

const getAllRequests = async (req, res) => {
  const { limit, page } = formatLimitAndPage(req.query);

  const result = await RequestService.getAllRequests(limit, page);
  const { results, statusCode } = formatHTTPResponse(200, result);

  return res.status(statusCode).json({ results });
};

const getRequestById = async (req, res) => {
  const { id } = req.params;

  const result = await RequestService.getRequestById(id);

  if (result.err) {
    const { results, statusCode } = formatHTTPResponse(401, result);
    return res.status(statusCode).json({ results });
  }

  return res.status(200).json({ result });
};

const updateRequest = async (req, res) => {
  const { id } = req.params;

  const result = await RequestService.updateRequest(id, req.body);

  if (result.err) {
    const { results, statusCode } = formatHTTPResponse(400, result);
    return res.status(statusCode).json({ results });
  }

  return res.status(200).send();
};

const getRequestsByUserId = async (req, res) => {
  const { uid } = req.params;

  const result = await RequestService.getAllRequestFromUser(uid);
  const { results, statusCode } = formatHTTPResponse(200, result);

  res.status(statusCode).json({ results });
};

export {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  getRequestsByUserId,
};
