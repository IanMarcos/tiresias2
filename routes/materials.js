const { Router } = require('express');
const { body } = require('express-validator');
const { createMaterial } = require('../controllers/material');
const { validateResults } = require('../middlewares/fields-validator');
const {
  isValidYear,
  sanitizeOptFields,
  validateOptFields,
} = require('../middlewares/material-validations');

const router = Router();

// POST Material
router.post('/', [
  body('title', '40002').isLength({ min: 3, max: 80 }).trim(),
  body('authors', '40003').isArray(),
  body('isbn', '40003').isNumeric().toInt(),
  body('language', '40002').isLength({ min: 2, max: 2 }), // TODO Check this and countries
  body('format', '40001').notEmpty(),
  body('publisher', '40001').notEmpty(),
  body('publishCity', '40001').notEmpty(),
  body('publishCountry', '40001').notEmpty(),
  body('publishYear', '40003').isNumeric().toInt(),
  body('publishYear').custom(isValidYear),
  body('producer', '40001').notEmpty(),
  body('productionCity', '40001').notEmpty(),
  body('productionCountry', '40001').notEmpty(),
  body('productionYear', '40003').isNumeric().toInt(),
  body('productionYear').custom(isValidYear),
  validateResults,
  validateOptFields,
  sanitizeOptFields,
], createMaterial);

module.exports = router;
