import { verifyJWT } from '../helpers/jwt.js';

/**
 * Validates the existence of a token in a request headers.
 * If it exists, validates the integrity of its contents.
 * Finally it saves the token informarion in the request object in a 'requester' property
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const validateJWT = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res
      .status(401)
      .json({ results: { err: 'No hay token en la petición' } });
  }

  const requester = verifyJWT(token);
  if (!requester.uid) {
    return res.status(401).json({ results: { err: 'Token invalido' } });
  }

  req.requester = requester;

  return next();
};

export { validateJWT };
