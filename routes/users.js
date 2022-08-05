import { Router } from 'express';
import { body } from 'express-validator';
import { isValidPassword, isValidUserName, sanitizeOptionalFields } from '../middlewares/users-validations.js';
import { validateResults } from '../middlewares/fields-validator.js';
import { createUser } from '../controllers/users.js';

const router = Router();

// router.get('/', getAllUsers)

// router.get('/:uid', [
//     param('uid', 'No es un id de Mongo').isMongoId(),
//     param('uid').custom(userExistById),
//     validateResults
// ], getUserById);

router.post('/', [
  body('userName', '40001').notEmpty().trim(),
  body('userName').custom(isValidUserName),
  body('password', '40001').notEmpty(),
  validateResults,
  isValidPassword,
  sanitizeOptionalFields,
], createUser);

// router.put('/:uid', [
//     validateJWT,
//     param('uid', 'No es un id de Mongo').isMongoId(),
//     param('uid').custom(userExistById),
//     validateResults
// ], updateUser);

// router.delete('/:uid', [
//     validateJWT,
//     param('uid', 'No es un id de Mongo').isMongoId(),
//     param('uid').custom(userExistById),
//     validateResults
// ], deleteUser);

export default router;
