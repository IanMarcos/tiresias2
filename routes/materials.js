const { Router } = require('express');
// const { body } = require('express-validator');
const { createMaterial } = require('../controllers/material');
const { validateResults } = require('../middlewares/fields-validator');

const router = Router();

router.post('/', [validateResults], createMaterial);

module.exports = router;
