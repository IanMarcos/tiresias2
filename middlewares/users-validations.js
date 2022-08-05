const sanitizeOptionalFields = (req, res, next) => {
  const { name, role } = req.body;

  if (!name) {
    req.body.name = req.body.userName;
  }

  if (!role) {
    req.body.role = 'Basico';
  }
  next();
};

const isValidUserName = (userName) => {
  if (userName.includes(' ')) {
    throw new Error('40004');
  }
  return true;
};

const isValidPassword = (req, res, next) => {
  // TODO maybe add to a configuration file
  const passwordRegexp = /(?=.*[0-9])(?=.*[a-z|A-Z])(?=.*[!*?+\-_@#$^%&])(?=.{8,})/;

  if (!passwordRegexp.test(req.body.password) || req.body.password.length > 15) {
    return res.status(400).json({ results: { err: '40003 Contraseña incorrecta' } });
  }
  return next();
};

export {
  isValidPassword,
  isValidUserName,
  sanitizeOptionalFields,
};
