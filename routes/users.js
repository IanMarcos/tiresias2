import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  isValidPassword,
  isValidUpdateRequest,
  isValidUsername,
  sanitizeOptionalFields,
  requesterIsAdmin,
  requesterIsAdminOrSelf,
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

router.get(
  '/:uid',
  [
    param('uid', '40003').isNumeric(),
    validateResults,
    validateJWT,
    requesterIsAdminOrSelf,
  ],
  getUser
);

router.post(
  '/',
  [
    body('username', '40001').notEmpty().trim(),
    body('username').custom(isValidUsername),
    body('password', '40001').notEmpty(),
    validateResults,
    isValidPassword,
    sanitizeOptionalFields,
    validateJWT,
    requesterIsAdmin,
  ],
  createUser
);

router.put(
  '/:uid',
  [
    param('uid', '40003').isNumeric(),
    validateResults,
    validateJWT,
    requesterIsAdminOrSelf,
    isValidUpdateRequest,
  ],
  updateUser
);

router.delete(
  '/:uid',
  [
    param('uid', '40003').isNumeric(),
    validateResults,
    validateJWT,
    requesterIsAdmin,
  ],
  deleteUser
);

export default router;
