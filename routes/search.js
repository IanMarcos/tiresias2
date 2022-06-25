const { Router } = require('express');
const { body } = require('express-validator');
const { searchMaterialsAndAuthors } = require('../controllers/search');
const { validateResults } = require('../middlewares/fields-validator');

const router = Router();

router.get('/', [
  body('searchTerm', '40001').notEmpty(),
  body('searchTerm', '40002').isLength({ min: 3, max: 100 }),
  validateResults,
], searchMaterialsAndAuthors);

module.exports = router;
