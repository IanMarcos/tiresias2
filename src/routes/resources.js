import { Router } from 'express';
import { validateResults } from '../middlewares/fields-validator.js';
import { validateAuthToken } from '../middlewares/auth-validations.js';
import { getAccessibleFormats, getLanguages } from '../controllers/resources.js';

const router = Router();

/**
 * @swagger
 * /resources/formats:
 *  get:
 *    tags:
 *      - resources
 *    summary: Accessible formats
 *    description: List of accessible formats accepted by the server.
 *    requestBody:
 *      content:
 *        application/JSON:
 *          schema:
 *            $ref: '#/components/schemas/signInForm'
 *    responses:
 *      '200':
 *        description: Successfully retrieved the accessible formats list.
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
 *      '401':
 *        description: The authentication failed.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 *      '500':
 *        'description': Server or Database connection failure.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 */
router.get(
  '/formats',
  [validateResults, validateAuthToken],
  getAccessibleFormats
);

/**
 * @swagger
 * /resources/languages:
 *  get:
 *    tags:
 *      - resources
 *    summary: Languages
 *    description: List of languages by the server.
 *    requestBody:
 *      content:
 *        application/JSON:
 *          schema:
 *            $ref: '#/components/schemas/signInForm'
 *    responses:
 *      '200':
 *        description: Successfully retrieved the language list.
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
 *      '401':
 *        description: The authentication failed.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 *      '500':
 *        'description': Server or Database connection failure.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 */
router.get(
  '/languages',
  [validateResults, validateAuthToken],
  getLanguages
);

export default router;
