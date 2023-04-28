import { Router } from 'express';
import { requesterIsAdmin, validateAuthToken } from '../middlewares/auth-validations.js';
import {
  createRequest,
  getAllRequests,
  updateRequest,
} from '../controllers/request.js';
import { validateResults } from '../middlewares/fields-validator.js';

const router = Router();

/**
 * @swagger
 * /requests/:
 *  get:
 *    tags:
 *      - requests
 *    summary: Get all requests
 *    description: Gets all requests for new materials in the Tiresias Database.
 *    parameters:
 *      - in: path
 *        name: limit
 *        description: Number of items to retrieve per page.
 *        schema:
 *          type: integer
 *        default: 10
 *      - in: path
 *        name: page
 *        description: Number of the page to be retrieven.
 *        schema:
 *          type: integer
 *        default: 1
 *    responses:
 *      '200':
 *        description: OK. Requests retrieved successfully.
 *        content:
 *         application/json:
 *           schema:
 *             type: 'object'
 *             properties:
 *               results:
 *                 type: 'array'
 *                 items:
 *                   $ref: '#/components/schemas/Request'
 *      '401':
 *        description: Authorization information is missing or invalid.
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
 *    security:
 *    - bearerAuth: []
 */
router.get('/', [validateAuthToken, validateResults], getAllRequests);

/**
 * @swagger
 * /requests/:
 *  post:
 *    tags:
 *      - requests
 *    summary: Create a request for a new material 
 *    description: Creates a request for a new material to be added.
 *    requestBody:
 *      content:
 *        application/JSON:
 *          schema:
 *            $ref: '#/components/schemas/RequestForm'
 *    responses:
 *      '201':
 *        description: A successfully created request.
 *      '400':
 *        description: Bad request. A mandatory field was not provided.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/errorArray'
 *      '401':
 *        description: Authorization information is missing or invalid.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 *      '500':
 *        description: Server or Database connection failure.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 *    security:
 *    - bearerAuth: []
 */
router.post('/', [validateAuthToken, validateResults], createRequest);

/**
 * @swagger
 * /requests/{id}:
 *  patch:
 *    tags:
 *      - requests
 *    summary: Update a request
 *    description: Update a request state and notes about the state.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Id of material request to update.
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      content:
 *        application/JSON:
 *          schema:
 *            $ref: '#/components/schemas/RequestForm'
 *    responses:
 *      '200':
 *        description: OK. Request updated successfully.
 *      '400':
 *        description: Bad request. No field was provided or the password is not strong enough.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/errorArray'
 *      '401':
 *        description: Authorization information is missing or invalid.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 *      '403':
 *        description: The user doing the request is not authorized for this kind of operations.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 *      '404':
 *        description: The request doesn't exist.
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
 *    security:
 *    - bearerAuth: []
 */
router.patch('/:id', [validateAuthToken, requesterIsAdmin, validateResults], updateRequest);

export default router;
