import { param } from 'express-validator';
import { Router } from 'express';
import {
  requesterIsAdmin,
  requesterIsAdminOrSelf,
  validateAuthToken,
} from '../middlewares/auth-validations.js';
import {
  createRequest,
  getAllRequests,
  getRequestById,
  getRequestsByUserId,
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
 * /requests/{id}:
 *  get:
 *    tags:
 *      - requests
 *    summary: Get a request by ID
 *    description: Retrieves a specific request from the Tiresias Database by its ID.
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID of the request to retrieve.
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: OK. Request retrieved successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Request'
 *      '401':
 *        description: Authorization information is missing or invalid.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/singleError'
 *      '500':
 *        description: Server or Database connection failure.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/singleError'
 *    security:
 *      - bearerAuth: []
 */
router.get('/:id', [validateAuthToken, validateResults], getRequestById);

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
router.patch(
  '/:id',
  [validateAuthToken, requesterIsAdmin, validateResults],
  updateRequest
);

/**
 * @swagger
 * /requests/user/{uid}:
 *  get:
 *    tags:
 *      - requests
 *    summary: Get all requests by user
 *    description: Gets all requests created by a single user.
 *    parameters:
 *      - name: uid
 *        in: path
 *        description: Id of the user whose requests are to be fetched.
 *        required: true
 *        schema:
 *          type: integer
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
router.get(
  '/user/:uid',
  [
    validateAuthToken,
    requesterIsAdminOrSelf,
    param('uid', '40003').isNumeric().toInt(),
    validateResults,
  ],
  getRequestsByUserId
);

export default router;
