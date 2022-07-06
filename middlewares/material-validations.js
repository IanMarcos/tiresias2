// Middleware Customs
const isValidYear = (value) => {
  // Verifica que un material no pueda tener un año invalido asociado
  const currentDate = new Date();
  if (value > currentDate.getFullYear() || value < 0) {
    throw new Error('40004');
  }
  return true;
};

const sanitizeOptFields = (req, res, next) => {
  const {
    edition,
    contributors,
    recipients,
    categories,
    narrator,
    duration,
    resume,
    productionState,
  } = req.body;

  // Formato de campos opcionales no incluidos en el body
  if (!edition) req.body.edition = '';
  if (!contributors || !Array.isArray(contributors)) req.body.contributors = [];
  if (!recipients) req.body.recipients = '';
  if (!categories || !Array.isArray(categories)) req.body.categories = [];
  if (!narrator) req.body.narrator = '';
  if (!duration) req.body.duration = null;
  if (!resume) req.body.resume = '';
  if (!productionState) req.body.productionState = 'Disponible';

  return next();
};

/** Validar con express-validator de la forma: body('campo').metodoX()
*   hace que el campo 'campo' tenga que estar obligatoriamente en el body.
*   Por esto se hace un middleware aparte que no será llamado en un .custom()
*/
const validateOptFields = (req, res, next) => {
  // Gestión de campos opcionales
  const {
    edition,
    contributors,
    recipients,
    categories,
    narrator,
    duration,
    resume,
    productionState,
  } = req.body;

  if (edition && (typeof (edition) !== 'string' || edition.length() > 45)) {
    return res.status(400).json({ results: { err: '40004 (edition)' } });
  }

  if (contributors && !Array.isArray(contributors)) {
    return res.status(400).json({ results: { err: '40003 (contributors)' } });
  }

  if (recipients && (typeof (recipients) !== 'string' || recipients.length() > 80)) {
    return res.status(400).json({ results: { err: '40004 (recipients)' } });
  }

  if (categories && !Array.isArray(categories)) {
    return res.status(400).json({ results: { err: '40003 (categories)' } });
  }

  if (narrator && typeof (narrator) !== 'string') {
    return res.status(400).json({ results: { err: '40004 (narrator)' } });
  }

  // Se valida que la duración esté en formato HH:MM:SS
  const timeFormat = /[0-9]?[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/; // TODO get out of here
  if (duration && !timeFormat.test(duration)) {
    return res.status(400).json({ results: { err: '40003 (duration)' } });
  }

  if (resume && (typeof (resume) !== 'string' || resume.length() > 1800)) {
    return res.status(400).json({ results: { err: '40004 (resume)' } });
  }

  const validStates = ['Disponible', 'En curso'];
  if (productionState && !validStates.includes(productionState)) {
    return res.status(400).json({ results: { err: '40004 (productionState)' } });
  }

  return next();
};

module.exports = {
  isValidYear,
  sanitizeOptFields,
  validateOptFields,
};
