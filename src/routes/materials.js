import { Router } from 'express';
import { body } from 'express-validator';
import {
  createMaterial,
  deleteMaterial,
  getAllMaterials,
  getMaterial,
  updateMaterial,
} from '../controllers/material.js';
import { parseRequestWithMaterialFile } from '../middlewares/multer.js';
import {
  isBodyEmpty,
  validateResults,
} from '../middlewares/fields-validator.js';
import {
  isFileInRequest,
  isValidAuthors,
  isValidDuration,
  isValidProductionState,
  isValidYear,
  sanitizeOptFields,
  validateFiles,
  validateUpdateRequest,
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
 *              $ref: '#/components/schemas/singleError'
 *      '403':
 *        description: The user doing the request is not authorized for this kind of operations.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 *      '404':
 *        description: The material doesn't exist.
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
 *      '409':
 *        description: A unique field like isbn is already registered.
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
router.post(
  '/',
  [
    parseRequestWithMaterialFile,
    validateAuthToken,
    requesterIsAdmin,
    body('title', '40002').trim().isLength({ min: 3, max: 80 }),
    body('author').custom(isValidAuthors),
    body(['isbn', 'publishYear', 'productionYear'], '40003')
      .isNumeric()
      .toInt(),
    body(
      [
        'language',
        'format',
        'publisher',
        'publishCity',
        'publishCountry',
        'producer',
        'productionCity',
        'productionCountry',
      ],
      '40001'
    )
      .notEmpty()
      .trim(),
    body('publishYear').custom(isValidYear),
    body('productionYear').custom(isValidYear),
    body('edition', '40002').isLength({ max: 45 }).optional(),
    body('recipients', '40002').isLength({ max: 80 }).optional(),
    body('duration', '40003').custom(isValidDuration).optional(),
    body('resume', '40002').isLength({ max: 1800 }).optional(),
    body('productionState', '40004').custom(isValidProductionState).optional(),
    isFileInRequest,
    validateFiles,
    // sanitizeAuthors,
    sanitizeOptFields,
    validateResults,
  ],
  createMaterial
);

/**
 * @swagger
 * /materials/{id}:
 *  patch:
 *    tags:
 *      - materials
 *    summary: Update a Material
 *    description: If multiple authors, contributors, or categories need to be sent, the same field must be sent multiple times, one for each person or category.<br />Peoples name should be formated like "lastname, names", for example "Doe, John", and "Doe, John M." are both correct forms.<br />Both language and countries can be sent as either their full name in spanish or their ISO code; ISO 639-1 for the language, ISO 3166 alpha-2 for the countries.<br />If a duration is provided it must have a HHH:MM:SS or HH:MM:SS format.
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/MaterialUpdateForm'
 *    responses:
 *      '200':
 *        description: The material update was succesful.
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
 *      '409':
 *        description: A unique field like isbn is already registered.
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
router.patch(
  '/:id',
  [
    parseRequestWithMaterialFile,
    validateAuthToken,
    requesterIsAdmin,
    body('title', '40002').trim().isLength({ min: 3, max: 80 }).optional(),
    body('author').custom(isValidAuthors).optional(),
    body(['isbn', 'publishYear', 'productionYear'], '40003')
      .isNumeric()
      .toInt()
      .optional(),
    body(
      [
        'language',
        'format',
        'publisher',
        'publishCity',
        'publishCountry',
        'producer',
        'productionCity',
        'productionCountry',
      ],
      '40001'
    )
      .notEmpty()
      .trim()
      .optional(),
    body('publishYear').custom(isValidYear).optional(),
    body('productionYear').custom(isValidYear).optional(),
    body('edition', '40004').isLength({ min: 1, max: 45 }).optional(),
    body('recipients', '40004').isLength({ max: 80 }).optional(),
    body('duration', '40003').custom(isValidDuration).optional(),
    body('resume', '40004').isLength({ max: 1800 }).optional(),
    body('productionState', '40004').custom(isValidProductionState).optional(),
    validateFiles,
    isBodyEmpty,
    validateUpdateRequest,
    validateResults,
  ],
  updateMaterial
);

router.post('/people', [validateAuthToken, requesterIsAdmin]);

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
 *              $ref: '#/components/schemas/singleError'
 *      '403':
 *        description: The user doing the request is not authorized for this kind of operations.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 *      '404':
 *        description: The material doesn't exist.
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
router.delete('/:id', [validateAuthToken, requesterIsAdmin], deleteMaterial);

export default router;
