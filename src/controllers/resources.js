import { formatHTTPResponse } from '../helpers/formatters.js';
import FormatService from '../services/format.js';

const getAccessibleFormats = async (req, res) => {
  const formatService = new FormatService();
  const result = await formatService.getAllAccessibleFormats();
  const { statusCode, results } = formatHTTPResponse(200, result);

  return res.status(statusCode).json({ results });
};

export { getAccessibleFormats };
