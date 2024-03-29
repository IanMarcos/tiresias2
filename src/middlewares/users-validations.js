import { addErrorToRequest } from '../helpers/formatters.js';
import {
  areStringsEqual,
  isDefined,
  isPasswordStrong,
} from '../helpers/utils.js';

const sanitizeOptionalFields = (req, res, next) => {
  const { name, role } = req.body;

  if (!name) {
    req.body.name = req.body.username;
  }

  if (!role) {
    req.body.role = 'Basico';
  }
  next();
};

const isValidUsername = (username) => {
  if (username.includes(' ')) {
    throw new Error('40004');
  }
  return true;
};

const isValidPassword = (req, res, next) => {
  if (!isPasswordStrong(req.body.password)) {
    addErrorToRequest(req, 'Contraseña invalida', 'password', 'body');
  }
  next();
};

const roleIsNotAdmin = (req, res, next) => {
  const { role } = req.body;
  if (isDefined(role) && areStringsEqual(role, 'Administrador')) {
    req.unauthorized = true;
  }
  next();
};

const isValidUpdateRequest = async (req, res, next) => {
  const { body } = req;

  if (Object.keys(body).length === 0 && body.constructor === Object) {
    return res
      .status(400)
      .json({ results: { err: '40001 No hay datos para actualizar' } });
  }

  const { name, password, role } = req.body;

  if (
    isDefined(password) &&
    (typeof password !== 'string' || !isPasswordStrong(password))
  ) {
    return res.status(400).json({
      results: { err: '40003 Algún campo no tiene formato adecuado' },
    });
  }

  if (isDefined(name)) {
    if (typeof name !== 'string' || name.length === 0) {
      return res.status(400).json({
        results: { err: '40003 Algún campo no tiene formato adecuado' },
      });
    }

    if (req.requester.role !== 'Administrador') {
      return res
        .status(403)
        .json({ results: { err: 'No está autorizado para esta operación' } });
    }
  }

  if (isDefined(role)) {
    if (typeof role !== 'string') {
      return res.status(400).json({
        results: { err: '40003 rol en formato inadecuado' },
      });
    }

    if (req.requester.role !== 'Administrador') {
      return res
        .status(403)
        .json({ results: { err: 'No está autorizado para esta operación' } });
    }

    if (areStringsEqual(role, 'Administrador')) {
      return res.status(403).json({ results: { err: 'Operación prohibida' } });
    }
  }

  return next();
};

export {
  isValidPassword,
  isValidUpdateRequest,
  isValidUsername,
  roleIsNotAdmin,
  sanitizeOptionalFields,
};
