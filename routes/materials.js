import { Router } from 'express';
import { body } from 'express-validator';
import { createMaterial, deleteMaterial } from '../controllers/material.js';
import { uploadFile } from '../middlewares/multer.js';
import { validateResults } from '../middlewares/fields-validator.js';
import {
  fileNotEmpty,
  isValidAuthors,
  isValidYear,
  sanitizeOptFields,
  validateFiles,
  validateOptFields,
} from '../middlewares/material-validations.js';

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

router.delete('/:id', deleteMaterial);

export default router;
