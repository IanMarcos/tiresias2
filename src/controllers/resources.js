import { formatHTTPResponse } from '../helpers/formatters.js';
import FormatService from '../services/format.js';
import LanguageService from '../services/language.js';
import RequestService from '../services/request.js';

const getAccessibleFormats = async (req, res) => {
  const formatService = new FormatService();
  const result = await formatService.getAllAccessibleFormats();
  const { statusCode, results } = formatHTTPResponse(200, result);

  return res.status(statusCode).json({ results });
};

const getLanguages = async (req, res) => {
  const languageService = new LanguageService();
  const result = await languageService.getAllLanguages();
  const { statusCode, results } = formatHTTPResponse(200, result);

  return res.status(statusCode).json({ results });
};

const getRequestStates = async (req, res) => {
  const result = await RequestService.getAllRequestsStates();
  const { statusCode, results } = formatHTTPResponse(200, result);

  return res.status(statusCode).json({ results });
};

export { getAccessibleFormats, getLanguages, getRequestStates };
