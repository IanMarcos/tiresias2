const { validationResult } = require('express-validator');
// Valida que no haya habido algún error en algún campo
const validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ results: { err: errors.array() } });
  }
  return next();
};

module.exports = {
  validateResults,
};
