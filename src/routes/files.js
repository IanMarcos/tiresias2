import { Router } from 'express';
import { validateResults } from '../middlewares/fields-validator.js';
import { validateAuthToken } from '../middlewares/auth-validations.js';
import { getFile } from '../controllers/files.js';

const router = Router();
/**
 * @swagger
 * /files/{mid}:
 *  get:
 *    tags:
 *      - files
 *    summary: Get a file
 *    description: Gets a file by the provided mid.
 *    parameters:
 *      - name: mid
 *        in: path
 *        description: Material id of file to return
 *        required: true
 *        schema:
 *          type: string
 *    produces:
 *      - application/pdf
 *      - application/msword
 *      - application/vnd.openxmlformats-officedocument.wordprocessingml.document
 *    responses:
 *      '200':
 *        description: OK. File retrieved successfully.
 *        schema:
 *          type: file
 *      '401':
 *        description: Authorization information is missing or invalid.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 *      '404':
 *        description: The material doesn't exist, or the file associated to the file no longer exits.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 *      '500':
 *        'description': Server or Database connection failure
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/singleError'
 *    security:
 *    - bearerAuth: []
 */
router.get('/:mid', [validateAuthToken, validateResults], getFile);

export default router;
