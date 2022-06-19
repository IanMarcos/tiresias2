const { Router } = require('express');
const { body } = require('express-validator');
const { searchMaterialsAndAuthors } = require('../controllers/search');
const { validateResults } = require('../middlewares/fields-validator');

const router = Router();

router.get('/', [
  body('searchTerm', 'El término de búsqueda es obligatorio').notEmpty(),
  validateResults
], searchMaterialsAndAuthors);

module.exports = router;
