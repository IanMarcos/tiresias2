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
    req.noValidToken = true;
    return next();
  }

  const [, token] = authorization.split(' ');

  const requester = verifyJWT(token);
  if (!requester.uid) {
    req.noValidToken = true;
    return next();
  }

  req.requester = requester;

  return next();
};

const requesterIsAdmin = async (req, res, next) => {
  if (req.requester?.role !== 'Administrador') {
    req.unauthorized = true;
  }

  return next();
};

const requesterIsAdminOrSelf = async (req, res, next) => {
  if (
    Number(req.params.uid) !== req.requester.uid &&
    req.requester?.role !== 'Administrador'
  ) {
    req.unauthorized = true;
  }

  return next();
};

export { validateAuthToken, requesterIsAdmin, requesterIsAdminOrSelf };
