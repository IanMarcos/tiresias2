import { isPasswordStrong } from '../helpers/misc.js';
import UsersService from '../services/user.js';

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

const isValidUpdateRequest = (req, res, next) => {
  const { body } = req;

  if (Object.keys(body).length === 0 && body.constructor === Object) {
    return res
      .status(400)
      .json({ results: { err: '40001 No hay datos para actualizar' } });
  }

  const { name, password } = req.body;

  if (name && typeof name !== 'string') {
    return res.status(400).json({
      results: { err: '40003 Algún campo no tiene formato adecuado' },
    });
  }

  if (
    password &&
    (typeof password !== 'string' || !isPasswordStrong(password))
  ) {
    return res.status(400).json({
      results: { err: '40003 Algún campo no tiene formato adecuado' },
    });
  }

  return next();
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
  const userService = new UsersService();

  if (!(await userService.userIsAdmin(req.tokenUid))) {
    return res
      .status(401)
      .json({ results: { err: 'No está autorizado para esta operación' } });
  }

  return next();
};

export {
  isValidPassword,
  isValidUpdateRequest,
  isValidUsername,
  requesterIsAdmin,
  sanitizeOptionalFields,
};
