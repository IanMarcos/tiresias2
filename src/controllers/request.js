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

  res.status(statusCode).json({ results });
};

const getAllRequests = async (req, res) => {
  const { limit, page } = formatLimitAndPage(req.query);

  const result = await RequestService.getAllRequests(limit, page);

  const { results, statusCode } = formatHTTPResponse(200, result);

  res.status(statusCode).json({ results });
};

const updateRequest = async (req, res) => {
  const { id } = req.params;

  const result = await RequestService.updateRequest(id, req.body);

  // TODO: Check this errors
  if (result.err) {
    const { results, statusCode } = formatHTTPResponse(400, result);
    return res.status(statusCode).json({ results });
  }

  return res.status(200).send();
};

export { createRequest, getAllRequests, updateRequest };
