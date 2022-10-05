import MaterialService from '../services/material.js';
import { formatHTTPResponse } from '../helpers/formatters.js';
import { fileExists } from '../helpers/file-manager.js';

const getFile = async (req, res) => {
  const { mid } = req.params;

  const result = await MaterialService.getMaterialFile(mid);

  const { results, statusCode } = formatHTTPResponse(200, result);

  if (statusCode !== 200) {
    return res.status(statusCode).json({ results });
  }

  if (!fileExists(results.uri)) {
    return res.status(404).json({
      results: {
        err: 'El archivo no está disponible. Contacte al administrador.',
      },
    });
  }

  return res.sendFile(results.uri);
};

export { getFile };
