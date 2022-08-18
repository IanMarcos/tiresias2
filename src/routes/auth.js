import { Router } from 'express';
import { body } from 'express-validator';
import { validateResults } from '../middlewares/fields-validator.js';
import { signIn } from '../controllers/auth.js';

const router = Router();

/**
 * @swagger
 * /auth/signin:
 *  post:
 *    tags:
 *      - auth
 *    summary: Sign in
 *    description: Authentication with username and password in order to get an authorization token.
 *    requestBody:
 *      content:
 *        application/JSON:
 *          schema:
 *            $ref: '#/components/schemas/signInForm'
 *    responses:
 *      '200':
 *        description: Successfully authenticated.
 *        content:
 *         application/json:
 *           schema:
 *            type: 'object'
 *            properties:
 *              results:
 *                type: 'object'
 *                properties:
 *                  token:
 *                    type: 'string'
 *      '400':
 *        description: Bad request. A mandatory field was not provided.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 *      '401':
 *        description: The authentication failed.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 *      '404':
 *        description: The user doesn't exist.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 *      '500':
 *        'description': Server or Database connection failure.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 */
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
