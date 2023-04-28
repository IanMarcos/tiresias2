import { Router } from 'express';
import { getAccessibleFormats, getLanguages, getRequestStates } from '../controllers/resources.js';

const router = Router();

/**
 * @swagger
 * /resources/formats:
 *  get:
 *    tags:
 *      - resources
 *    summary: Get all accessible formats
 *    description: Returns a list of accessible formats accepted by the server.
 *    responses:
 *      '200':
 *        description: Successfully retrieved the accessible formats list.
 *        content:
 *         application/json:
 *           schema:
 *            type: 'object'
 *            properties:
 *              results:
 *                type: 'array'
 *                items:
 *                  $ref: '#/components/schemas/baseObject'
 *      '500':
 *        'description': Server or Database connection failure.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 */
router.get('/formats', getAccessibleFormats);

/**
 * @swagger
 * /resources/languages:
 *  get:
 *    tags:
 *      - resources
 *    summary: Get all languages
 *    description: Gets a list of all the languages in the Tiresias Database.
 *    responses:
 *      '200':
 *        description: Successfully retrieved the language list.
 *        content:
 *         application/json:
 *           schema:
 *            type: 'object'
 *            properties:
 *              results:
 *                type: 'array'
 *                items:
 *                  $ref: '#/components/schemas/Language'
 *      '500':
 *        'description': Server or Database connection failure.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 */
router.get('/languages', getLanguages);

/**
 * @swagger
 * /resources/requestStates:
 *  get:
 *    tags:
 *      - resources
 *    summary: Get all request's states
 *    description: Gets a list of all the states a request for a new material can be.
 *    responses:
 *      '200':
 *        description: Successfully retrieved.
 *        content:
 *         application/json:
 *           schema:
 *            type: 'object'
 *            properties:
 *              results:
 *                type: 'array'
 *                items:
 *                  $ref: '#/components/schemas/baseObject'
 *      '500':
 *        'description': Server or Database connection failure.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 */
router.get('/requestStates', getRequestStates);

export default router;
