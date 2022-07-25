const { Router } = require('express');
const { body } = require('express-validator');
const { createMaterial } = require('../controllers/material');
const { uploadFile } = require('../middlewares/multer');
const { validateResults } = require('../middlewares/fields-validator');
const {
  fileNotEmpty,
  isValidAuthors,
  isValidYear,
  sanitizeOptFields,
  validateFiles,
  validateOptFields,
} = require('../middlewares/material-validations');

const router = Router();
// POST Material
router.post('/', [
  uploadFile,
  body('title', '40002').isLength({ min: 3, max: 80 }).trim(),
  body('author').custom(isValidAuthors),
  body('isbn', '40003').isNumeric().toInt(),
  body('language', '40002').notEmpty().trim(),
  body('format', '40001').notEmpty().trim(),
  body('publisher', '40001').notEmpty().trim(),
  body('publishCity', '40001').notEmpty().trim(),
  body('publishCountry', '40001').notEmpty().trim(),
  body('publishYear', '40003').isNumeric().toInt(),
  body('publishYear').custom(isValidYear),
  body('producer', '40001').notEmpty().trim(),
  body('productionCity', '40001').notEmpty().trim(),
  body('productionCountry', '40001').notEmpty().trim(),
  body('productionYear', '40003').isNumeric().toInt(),
  body('productionYear').custom(isValidYear),
  fileNotEmpty,
  validateFiles,
  validateResults,
  validateOptFields,
  // sanitizeAuthors,
  sanitizeOptFields,
], createMaterial);

module.exports = router;
