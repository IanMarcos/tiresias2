import { validationResult } from 'express-validator';

const validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ results: { err: errors.array() } });
  }
  return next();
};

export {
  validateResults,
};
