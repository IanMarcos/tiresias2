import { isDefined, isPasswordStrong } from '../helpers/misc.js';

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
    return res
      .status(400)
      .json({ results: { err: '40003 Contraseña invalida' } });
  }
  return next();
};

const requesterIsAdmin = async (req, res, next) => {
  if (req.requester.role !== 'Administrador') {
    return res
      .status(401)
      .json({ results: { err: 'No está autorizado para esta operación' } });
  }

  return next();
};

const requesterIsAdminOrSelf = async (req, res, next) => {
  if (
    Number(req.params.uid) !== req.requester.uid &&
    req.requester.role !== 'Administrador'
  ) {
    return res
      .status(401)
      .json({ results: { err: 'No está autorizado para esta operación' } });
  }

  return next();
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
        .status(401)
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
        .status(401)
        .json({ results: { err: 'No está autorizado para esta operación' } });
    }
  }

  return next();
};

export {
  isValidPassword,
  isValidUpdateRequest,
  isValidUsername,
  requesterIsAdmin,
  requesterIsAdminOrSelf,
  sanitizeOptionalFields,
};
