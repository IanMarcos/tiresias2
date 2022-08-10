import { verifyJWT } from '../helpers/jwt.js';

const validateJWT = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res
      .status(400)
      .json({ results: { err: 'No hay token en la petición' } });
  }

  const { uid } = verifyJWT(token);
  if (!uid) {
    return res
      .status(401)
      .json({ results: { err: 'Token invalido' } });
  }

  req.tokenUid = uid;

  return next();
};

export {
  validateJWT,
};
