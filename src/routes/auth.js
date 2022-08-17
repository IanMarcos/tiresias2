import { Router } from 'express';
import { body } from 'express-validator';
import { validateResults } from '../middlewares/fields-validator.js';
import { signIn } from '../controllers/auth.js';

const router = Router();

router.post(
  '/signin',
  [
    body('username', '40001').notEmpty(),
    body('password', '40001').notEmpty(),
    validateResults,
  ],
  signIn
);

export default router;
