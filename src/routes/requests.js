import { Router } from 'express';
import { validateAuthToken } from '../middlewares/auth-validations.js';
import {
  createRequest,
  getAllRequests,
  updateRequest,
} from '../controllers/request.js';
import { validateResults } from '../middlewares/fields-validator.js';

const router = Router();

router.get('/', [validateAuthToken, validateResults], getAllRequests);
router.post('/', [validateAuthToken, validateResults], createRequest);
router.patch('/:id', [validateAuthToken, validateResults], updateRequest);

export default router;
