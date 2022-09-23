import { addErrorToRequest, convertBytesToMB } from '../helpers/formatters.js';
import { getFileFormatFromMimetype, isDefined } from '../helpers/utils.js';

// Middleware Customs
const fileNotEmpty = (req, res, next) => {
  if (!req.file) {
    addErrorToRequest(req, '40001', 'materialFile', 'body');
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
  } else {
    req.body.authors = req.body.author.map((author) => author.trim());
  }

  delete req.body.author;
  // next();
};

const sanitizeContributors = (req) => {
  if (typeof req.body.contributor === 'string') {
    req.body.contributors = [req.body.contributor.trim()];
  } else {
    req.body.contributors = req.body.contributor.map((contributor) =>
      contributor.trim()
    );
  }

  delete req.body.contributor;
};

const sanitizeCategories = (req) => {
  if (typeof req.body.category === 'string') {
    req.body.categories = [req.body.category.trim()];
  } else {
    req.body.categories = req.body.category.map((category) => category.trim());
  }

  delete req.body.category;
};

const sanitizeOptFields = (req, res, next) => {
  const {
    edition,
    contributor,
    recipients,
    category,
    narrator,
    duration,
    resume,
    productionState,
  } = req.body;

  if (!edition) req.body.edition = null;
  if (isDefined(contributor)) {
    sanitizeContributors(req);
  } else {
    req.body.contributors = [];
  }
  if (!recipients) req.body.recipients = null;
  if (isDefined(category)) {
    sanitizeCategories(req);
  } else {
    req.body.categories = [];
  }
  if (!narrator) req.body.narrator = '';
  if (!duration) req.body.duration = null;
  if (!resume) req.body.resume = null;
  if (!productionState) req.body.productionState = 'Disponible';

  req.body.fileSize = convertBytesToMB(req.file.size);

  next();
};

const validateFiles = (req, res, next) => {
  const validFormats = ['docx', 'pdf'];

  if (!validFormats.includes(getFileFormatFromMimetype(req.file.mimetype))) {
    addErrorToRequest(req, '40003', 'materialFile', 'body');
  } else {
    req.body.filePath = req.file.filename;
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

  if (edition && (typeof edition !== 'string' || edition.length() > 45)) {
    addErrorToRequest(req, '40004', 'edition', 'body');
  }

  if (contributors) {
    if (typeof contributors !== 'string' && !Array.isArray(contributors)) {
      addErrorToRequest(req, '40003', 'contributors', 'body');
    }

    if (Array.isArray(contributors) && contributors.length === 0) {
      addErrorToRequest(req, '40003', 'contributors', 'body');
    }
  }

  if (
    recipients &&
    (typeof recipients !== 'string' || recipients.length() > 80)
  ) {
    addErrorToRequest(req, '40004', 'recipients', 'body');
  }

  if (categories && !Array.isArray(categories)) {
    addErrorToRequest(req, '40003', 'categories', 'body');
  }

  if (narrator && typeof narrator !== 'string') {
    addErrorToRequest(req, '40004', 'narrator', 'body');
  }

  const timeFormat = /[0-9]?[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/;
  if (duration && !timeFormat.test(duration)) {
    addErrorToRequest(req, '40003', 'duration', 'body');
  }

  if (resume && (typeof resume !== 'string' || resume.length() > 1800)) {
    addErrorToRequest(req, '40004', 'resume', 'body');
  }

  const validStates = ['Disponible', 'En Curso'];
  if (productionState && !validStates.includes(productionState)) {
    addErrorToRequest(req, '40004', 'productionState', 'body');
  }

  return next();
};

export {
  fileNotEmpty,
  isValidAuthors,
  isValidYear,
  sanitizeAuthors,
  sanitizeOptFields,
  validateFiles,
  validateOptFields,
};
