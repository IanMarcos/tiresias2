import { validationResult } from 'express-validator';
import { deleteFile } from '../helpers/file-manager.js';
import { addErrorToRequest } from '../helpers/formatters.js';

const validateResults = (req, res, next) => {
  if (req.noValidToken) {
    if (req.file) {
      deleteFile(req.file.path);
    }
    return res
      .status(401)
      .json({ results: { err: 'No se encontraron credenciales validas' } });
  }

  if (req.unauthorized) {
    if (req.file) {
      deleteFile(req.file.path);
    }
    return res.status(403).json({
      results: {
        err: 'No está autorizado para esta operación o la operación está prohibida',
      },
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      deleteFile(req.file.path);
    }
    return res.status(400).json({ results: { err: errors.array() } });
  }

  if (req.err) {
    if (req.file) {
      deleteFile(req.file.path);
    }
    return res.status(400).json({ results: { err: req.err } });
  }
  return next();
};

const isBodyEmpty = (req, res, next) => {
  if (req.body && Object.keys(req.body).length === 0) {
    addErrorToRequest(req, 'No fields provided', '', 'body');
  }
  next();
};

export { validateResults, isBodyEmpty };
