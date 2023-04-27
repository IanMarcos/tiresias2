import { Router } from 'express';
import { validateAuthToken } from '../middlewares/auth-validations.js';
import {
  createRequest,
  getAllRequests,
  updateRequest,
} from '../controllers/request.js';

const router = Router();

router.get('/', [validateAuthToken], getAllRequests);
router.post('/', [validateAuthToken], createRequest);
router.patch('/:id', [validateAuthToken], updateRequest);

export default router;
