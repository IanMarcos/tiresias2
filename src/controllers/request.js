import RequestService from '../services/request.js';
import { formatHTTPResponse } from '../helpers/formatters.js';

const createRequest = async (req, res) => {
  const { requester } = req;
  const { body } = req;
  Object.assign(body, { userId: requester.uid });

  const result = await RequestService.createRequest(body);

  const { results, statusCode } = formatHTTPResponse(201, result);

  res.status(statusCode).json({ results });
};

export { createRequest };
