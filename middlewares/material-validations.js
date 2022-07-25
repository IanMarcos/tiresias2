const { convertBytesToMB, getFileFormatFromMimetype } = require('../helpers/misc');

// Middleware Customs
const fileNotEmpty = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ results: { err: '40001 (materialFile)' } });
  }
  return next();
};

const isValidAuthors = (authors) => {
  if (typeof authors !== 'string' && !Array.isArray(authors)) {
    throw new Error('40003');
  }

  if (Array.isArray(authors) && authors.length === 0) {
    throw new Error('40003');
  }
  return true;
};

const isValidYear = (year) => {
  const currentDate = new Date();
  if (year > currentDate.getFullYear() || year < 0) {
    throw new Error('40004');
  }
  return true;
};

const sanitizeAuthors = (req) => {
  if (typeof req.body.author === 'string') {
    req.body.authors = [req.body.author.trim()];
    delete req.body.author;
    // next();
  }

  if (Array.isArray(req.body.author)) {
    req.body.authors = req.body.author.map((author) => author.trim());
    delete req.body.author;
  }
  // next();
};

const sanitizeContributors = (req) => {
  if (typeof req.body.contributor === 'string') {
    req.body.contributors = [req.body.contributor.trim()];
    delete req.body.contributor;
    return;
  }

  req.body.contributors = req.body.contributor.map((contributor) => contributor.trim());
  delete req.body.contributor;
};

const sanitizeOptFields = (req, res, next) => {
  const {
    edition,
    contributor,
    recipients,
    categories,
    narrator,
    duration,
    resume,
    productionState,
  } = req.body;

  if (!edition) req.body.edition = '';
  if (contributor) {
    sanitizeContributors(req);
  } else {
    req.body.contributors = [];
  }
  if (!recipients) req.body.recipients = '';
  if (!categories || !Array.isArray(categories)) req.body.categories = [];
  if (!narrator) req.body.narrator = '';
  if (!duration) req.body.duration = null;
  if (!resume) req.body.resume = '';
  if (!productionState) req.body.productionState = 'Disponible';

  req.body.fileSize = convertBytesToMB(req.file.size);

  next();
};

const validateFiles = (req, res, next) => {
  if (!req.file) {
    next();
  }

  if (req.file.path.includes('\\')) {
    req.file.path = req.file.path.replace('\\', '/');
  }

  const validFormats = ['docx', 'pdf'];

  if (!validFormats.includes(getFileFormatFromMimetype(req.file.mimetype))) {
    return res.status(400).json({ results: { err: '40003 (materialFile)' } });
  }
  return next();
};

const validateOptFields = (req, res, next) => {
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

  if (contributors) {
    if (typeof contributors !== 'string' && !Array.isArray(contributors)) {
      return res.status(400).json({ results: { err: '40003 (contributors)' } });
    }

    if (Array.isArray(contributors) && contributors.length === 0) {
      return res.status(400).json({ results: { err: '40003 (contributors)' } });
    }
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

  const timeFormat = /[0-9]?[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/;
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
  fileNotEmpty,
  isValidAuthors,
  isValidYear,
  sanitizeAuthors,
  sanitizeOptFields,
  validateFiles,
  validateOptFields,
};
