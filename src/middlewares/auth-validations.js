import { verifyJWT } from '../helpers/jwt.js';

/**
 * Validates the existence of a token in a request headers.
 * If it exists, validates the integrity of its contents.
 * Finally it saves the token informarion in the request object in a 'requester' property
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const validateAuthToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ results: { err: 'No se encontraron credenciales' } });
  }

  const [, token] = authorization.split(' ');

  const requester = verifyJWT(token);
  if (!requester.uid) {
    return res
      .status(401)
      .json({ results: { err: 'Token de autorización invalido' } });
  }

  req.requester = requester;

  return next();
};

const requesterIsAdmin = async (req, res, next) => {
  if (req.requester.role !== 'Administrador') {
    return res
      .status(403)
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
      .status(403)
      .json({ results: { err: 'No está autorizado para esta operación' } });
  }

  return next();
};

export { validateAuthToken, requesterIsAdmin, requesterIsAdminOrSelf };
