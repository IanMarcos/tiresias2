import { Router } from 'express';
import { body } from 'express-validator';
import { searchMaterialsAndAuthors } from '../controllers/search.js';
import { validateResults } from '../middlewares/fields-validator.js';

const router = Router();

router.get(
  '/',
  [
    body('searchTerm', '40001').notEmpty(),
    body('searchTerm', '40002').isLength({ min: 3, max: 100 }),
    validateResults,
  ],
  searchMaterialsAndAuthors
);

export default router;
