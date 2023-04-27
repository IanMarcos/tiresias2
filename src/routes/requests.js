import { Router } from 'express';
import { validateAuthToken } from '../middlewares/auth-validations.js';
import { createRequest, getAllRequests } from '../controllers/request.js';

const router = Router();

router.get('/', [validateAuthToken], getAllRequests);
router.post('/', [validateAuthToken], createRequest);

export default router;