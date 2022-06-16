const { Router } = require('express');
const { body, param } = require('express-validator');
const { searchMaterialsAndAuthors } = require('../controllers/search');

const router = Router();

router.get('/', searchMaterialsAndAuthors);

module.exports = router;
