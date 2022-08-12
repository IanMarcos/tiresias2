import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  isValidPassword,
  isValidUpdateRequest,
  isValidUsername,
  sanitizeOptionalFields,
  requesterIsAdmin,
  requesterIsAdminOrSelf,
  roleIsNotAdmin,
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
    validateJWT,
    requesterIsAdminOrSelf,
    param('uid', '40003').isNumeric(),
    validateResults,
  ],
  getUser
);

router.post(
  '/',
  [
    validateJWT,
    requesterIsAdmin,
    body('username', '40001').notEmpty().trim(),
    body('username').custom(isValidUsername),
    body('password', '40001').notEmpty(),
    validateResults,
    roleIsNotAdmin,
    isValidPassword,
    sanitizeOptionalFields,
  ],
  createUser
);

router.put(
  '/:uid',
  [
    validateJWT,
    requesterIsAdminOrSelf,
    param('uid', '40003').isNumeric(),
    validateResults,
    isValidUpdateRequest,
  ],
  updateUser
);

router.delete(
  '/:uid',
  [
    validateJWT,
    requesterIsAdmin,
    param('uid', '40003').isNumeric(),
    validateResults,
  ],
  deleteUser
);

export default router;
