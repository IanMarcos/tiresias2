import { Router } from 'express';
import { body } from 'express-validator';
import {
  isValidPassword,
  isValidUpdateRequest,
  isValidUsername,
  sanitizeOptionalFields,
  requesterIsAdmin,
} from '../middlewares/users-validations.js';
import { validateResults } from '../middlewares/fields-validator.js';
import {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/users.js';
import { validateJWT } from '../middlewares/jwt-validation.js';

const router = Router();

router.get('/', [validateJWT, requesterIsAdmin], getAllUsers);

router.get('/:uid', [validateJWT, requesterIsAdmin], getUser);

router.post('/', [
  validateJWT,
  requesterIsAdmin,
  body('username', '40001').notEmpty().trim(),
  body('username').custom(isValidUsername),
  body('password', '40001').notEmpty(),
  validateResults,
  isValidPassword,
  sanitizeOptionalFields,
], createUser);

router.put('/:uid', [isValidUpdateRequest, validateJWT, requesterIsAdmin], updateUser);

router.delete('/:uid', [validateJWT, requesterIsAdmin], deleteUser);

export default router;
