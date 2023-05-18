import { formatHTTPResponse } from '../helpers/formatters.js';
import CategoriesService from '../services/categories.js';
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


const getCategories = async (req, res) => {
  const categoriesService = new CategoriesService();
  const result = await categoriesService.getAllCategories();
  const { statusCode, results } = formatHTTPResponse(200, result);

  return res.status(statusCode).json({ results });
};

const getRequestStates = async (req, res) => {
  const result = await RequestService.getAllRequestsStates();
  const { statusCode, results } = formatHTTPResponse(200, result);

  return res.status(statusCode).json({ results });
};

export { getAccessibleFormats, getCategories, getLanguages, getRequestStates };
