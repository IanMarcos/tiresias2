import { Router } from 'express';
import { body } from 'express-validator';
import {
  createMaterial,
  deleteMaterial,
  getAllMaterials,
  getMaterial,
} from '../controllers/material.js';
import { parseRequestWithMaterialFile } from '../middlewares/multer.js';
import { validateResults } from '../middlewares/fields-validator.js';
import {
  fileNotEmpty,
  isValidAuthors,
  isValidYear,
  sanitizeOptFields,
  validateFiles,
  validateOptFields,
} from '../middlewares/material-validations.js';
import {
  validateAuthToken,
  requesterIsAdmin,
} from '../middlewares/auth-validations.js';

const router = Router();

/**
 * @swagger
 * /materials/:
 *  get:
 *    tags:
 *      - materials
 *    summary: Get all materials
 *    description: Gets all materials in the Tiresias Database.
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
 *        description: OK. Materials retrieved successfully.
 *        content:
 *         application/json:
 *           schema:
 *             type: 'object'
 *             properties:
 *               results:
 *                 type: 'array'
 *                 items:
 *                   $ref: '#/components/schemas/Material'
 *      '401':
 *        description: Authorization information is missing or invalid.
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
 *    security:
 *    - bearerAuth: []
 */
router.get('/', [validateAuthToken], getAllMaterials);

/**
 * @swagger
 * /materials/{id}:
 *  get:
 *    tags:
 *      - materials
 *    summary: Get Material
 *    description: Gets the material with the provided id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Id of material to return
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: OK. Material retrieved successfully.
 *        content:
 *         application/json:
 *           schema:
 *            type: 'object'
 *            properties:
 *              results:
 *                $ref: '#/components/schemas/Material'
 *      '401':
 *        description: Authorization information is missing or invalid.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 *      '403':
 *        description: The user doing the request is not authorized for this kind of operations.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 *      '404':
 *        description: The material doesn't exist.
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
 *    security:
 *    - bearerAuth: []
 */
router.get('/:id', [validateAuthToken], getMaterial);

/**
 * @swagger
 * /materials/:
 *  post:
 *    tags:
 *      - materials
 *    summary: Create a new Material
 *    description: If multiple authors, contributors, or categories need to be sent, the same field must be sent multiple times, one for each person or category.<br />Peoples name should be formated like "lastname, names", for example "Doe, John", and "Doe, John M." are both correct forms.<br />Both language and countries can be sent as either their full name in spanish or their ISO code; ISO 639-1 for the language, ISO 3166 alpha-2 for the countries.<br />If a duration is provided it must have a HHH:MM:SS or HH:MM:SS format.
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/MaterialForm'
 *    responses:
 *      '201':
 *        description: A successfully created Material.
 *        content:
 *          application/json:
 *            schema:
 *              type: 'object'
 *              properties:
 *                results:
 *                  type: 'object'
 *                  properties:
 *                    id:
 *                      type: 'string'
 *      '400':
 *        description: Bad request. A mandatory field was not provided or did not have a valid format.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 *      '401':
 *        description: Authorization information is missing or invalid.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 *      '403':
 *        description: The user doing the request is not authorized for this kind of operations.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 *      '409':
 *        description: A unique field like isbn is already registered.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 *      '500':
 *        description: Server or Database connection failure.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 *    security:
 *    - bearerAuth: []
 */
router.post(
  '/',
  [
    parseRequestWithMaterialFile,
    body('title', '40002').trim().isLength({ min: 3, max: 80 }),
    body('author').custom(isValidAuthors),
    body('isbn', '40003').isNumeric().toInt(),
    body('language', '40002').notEmpty().trim(),
    body('format', '40001').notEmpty().trim(),
    body('publisher', '40001').notEmpty().trim(),
    body('publishCity', '40001').notEmpty().trim(),
    body('publishCountry', '40001').notEmpty().trim(),
    body('publishYear', '40003').isNumeric().toInt(),
    body('publishYear').custom(isValidYear),
    body('producer', '40001').notEmpty().trim(),
    body('productionCity', '40001').notEmpty().trim(),
    body('productionCountry', '40001').notEmpty().trim(),
    body('productionYear', '40003').isNumeric().toInt(),
    body('productionYear').custom(isValidYear),
    fileNotEmpty,
    validateFiles,
    validateResults,
    validateOptFields,
    validateAuthToken,
    requesterIsAdmin,
    // sanitizeAuthors,
    sanitizeOptFields,
  ],
  createMaterial
);

/**
 * @swagger
 * /materials/{id}:
 *  delete:
 *    tags:
 *      - materials
 *    summary: Delete Material
 *    description: Deletes the material with the provided id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Id of the material to eliminate.
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: OK. Material deleted successfully.
 *      '401':
 *        description: Authorization information is missing or invalid.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 *      '403':
 *        description: The user doing the request is not authorized for this kind of operations.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 *      '404':
 *        description: The material doesn't exist.
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
 *    security:
 *    - bearerAuth: []
 */
router.delete('/:id', [validateAuthToken, requesterIsAdmin], deleteMaterial);

export default router;
