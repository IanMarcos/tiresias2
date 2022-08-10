import jwt from 'jsonwebtoken';

const jwtKey = process.env.TIRESIAS_JWT_KEY;

const generateJWT = (payload) => {
  const rules = { expiresIn: '1d' };
  return jwt.sign(payload, jwtKey, rules);
};

const verifyJWT = (token) => {
  try {
    return jwt.verify(token, jwtKey);
  } catch (error) {
    return { err: true };
  }
};

export { generateJWT, verifyJWT };
