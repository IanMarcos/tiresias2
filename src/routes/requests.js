import { Router } from 'express';
import { validateAuthToken } from '../middlewares/auth-validations.js';
import { createRequest } from '../controllers/request.js';

const router = Router();

router.post('/', [validateAuthToken], createRequest);

export default router;