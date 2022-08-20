import { Router } from 'express';
import { body } from 'express-validator';
import { searchMaterialsAndAuthors } from '../controllers/search.js';
import { validateResults } from '../middlewares/fields-validator.js';

const router = Router();

/**
 * @swagger
 * /search/:
 *  get:
 *    tags:
 *      - search
 *    summary: Search of materials and authors
 *    description: Performs a query on the database to find materials with a name similar to the search term, as well as look for authors whose names or last name contains the search term.
 *    parameters:
 *      - in: path
 *        name: limit
 *        description: Number of items to retrieve per page.
 *        schema:
 *          type: integer
 *        default: 10
 *      - in: path
 *        name: page
 *        description: Numer of the page to be retrieven.
 *        schema:
 *          type: integer
 *        default: 1
 *    requestBody:
 *      content:
 *        application/JSON:
 *          schema:
 *            type: 'object'
 *            properties:
 *              query:
 *                type: 'string'
 *            required:
 *              - query
 *    responses:
 *      '200':
 *        description: OK. A list of materials and a list of authors have successfully been retrieved.
 *        content:
 *          application/json:
 *            schema:
 *              type: 'object'
 *              properties:
 *                materials:
 *                  type: 'array'
 *                  items:
 *                    $ref: '#/components/schemas/searchedMaterial'
 *                authors:
 *                  type: 'array'
 *                  items:
 *                    $ref: '#/components/schemas/Person'
 *      '400':
 *        description: Bad request. A mandatory field was not provided.
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
 *      '500':
 *        description: Server or Database connection failure.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 *    security:
 *    - bearerAuth: []
 */
router.get(
  '/',
  [
    body('query', '40001').notEmpty(),
    body('query', '40002').isLength({ min: 3, max: 100 }),
    validateResults,
  ],
  searchMaterialsAndAuthors
);

export default router;
