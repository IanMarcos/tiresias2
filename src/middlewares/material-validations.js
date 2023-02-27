import { addErrorToRequest, convertBytesToMB } from '../helpers/formatters.js';
import { getFileFormatFromMimetype, isDefined } from '../helpers/utils.js';

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

const isValidDuration = (duration) => {
  const timeFormatRegex = /[0-9]?[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/;
  if (!timeFormatRegex.test(duration)) {
    throw new Error('40003');
  }
  return true;
};

const isValidProductionState = (productionState) => {
  const validStates = ['Disponible', 'En Curso'];
  if (!validStates.includes(productionState)) {
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

  if (!edition || edition.length === 0) req.body.edition = null;
  if (isDefined(contributor)) {
    sanitizeContributors(req);
  } else {
    req.body.contributors = [];
  }
  if (!recipients || recipients.length === 0) req.body.recipients = null;
  if (isDefined(category)) {
    sanitizeCategories(req);
  } else {
    req.body.categories = [];
  }
  if (!narrator) req.body.narrator = '';
  if (!duration) req.body.duration = null;
  if (!resume) req.body.resume = null;
  if (!productionState) req.body.productionState = 'Disponible';

  next();
};

const isFileInRequest = (req, res, next) => {
  if (!req.file) {
    addErrorToRequest(req, '40001', 'materialFile', 'body');
  }
  next();
}

const validateFiles = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const validFormats = process.env.VALID_FILE_FORMATS;

  if (!validFormats.includes(getFileFormatFromMimetype(req.file.mimetype))) {
    addErrorToRequest(req, '40003', 'materialFile', 'body');
  } else {
    req.body.filePath = req.file.filename;
    req.body.fileSize = convertBytesToMB(req.file.size);
  }

  return next();
};

const validateUpdateRequest = (req, res, next) => {
  if ((req.body.publishCity && !req.body.publishCountry)
    || (!req.body.publishCity && req.body.publishCountry)) {
    addErrorToRequest(req, '40004 - No se puede mandar país sin ciudad o ciudad sin país', 'publishCity, publishCountry', 'body');
  }

  if ((req.body.productionCity && !req.body.productionCountry)
    || (!req.body.productionCity && req.body.productionCountry)) {
    addErrorToRequest(req, '40004 - No se puede mandar país sin ciudad o ciudad sin país', 'productionCity, productionCountry', 'body');
  }

  next();
}

export {
  isFileInRequest,
  isValidAuthors,
  isValidYear,
  isValidDuration,
  isValidProductionState,
  sanitizeAuthors,
  sanitizeOptFields,
  validateFiles,
  validateUpdateRequest,
};
