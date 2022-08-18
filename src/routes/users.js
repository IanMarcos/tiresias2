import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  isValidPassword,
  isValidUpdateRequest,
  isValidUsername,
  sanitizeOptionalFields,
  requesterIsAdmin,
  requesterIsAdminOrSelf,
  roleIsNotAdmin,
} from '../middlewares/users-validations.js';
import { validateResults } from '../middlewares/fields-validator.js';
import {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/users.js';
import { validateJWT } from '../middlewares/jwt-validation.js';

const router = Router();

/**
 * @swagger
 * /users/:
 *  get:
 *    tags:
 *      - users
 *    summary: Get all users
 *    description: Gets all users in the Tiresias Database.
 *    responses:
 *      '200':
 *        description: OK. All users retrieved successfully.
 *        content:
 *         application/json:
 *           schema:
 *             type: 'object'
 *             properties:
 *               results:
 *                 type: 'array'
 *                 items:
 *                   $ref: '#/components/schemas/User'
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
 *      '500':
 *        'description': Server or Database connection failure.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 *    security:
 *    - bearerAuth: []
 */
router.get('/', [validateJWT, requesterIsAdmin], getAllUsers);

/**
 * @swagger
 * /users/{uid}:
 *  get:
 *    tags:
 *      - users
 *    summary: Get User
 *    description: Gets a users by the provided id.
 *    parameters:
 *      - name: uid
 *        in: path
 *        description: Id of user to return
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: OK. User retrieved successfully.
 *        content:
 *         application/json:
 *           schema:
 *            type: 'object'
 *            properties:
 *              results:
 *                $ref: '#/components/schemas/User'
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
 *      '500':
 *        'description': Server or Database connection failure.
 *        content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/failedRequest'
 *    security:
 *    - bearerAuth: []
 */
router.get(
  '/:uid',
  [
    validateJWT,
    requesterIsAdminOrSelf,
    param('uid', '40003').isNumeric(),
    validateResults,
  ],
  getUser
);

/**
 * @swagger
 * /users/:
 *  post:
 *    tags:
 *      - users
 *    summary: Create a new user
 *    description: Create a new user with the given username and password.<br />If no role is provided the default "Basico", will be used.<br />It's not possible to create a user with an admin role through the API.<br />If no name is provided the username will be used as name.
 *    requestBody:
 *      content:
 *        application/JSON:
 *          schema:
 *            $ref: '#/components/schemas/UserForm'
 *    responses:
 *      '201':
 *        description: A successfully created user.
 *        content:
 *          application/json:
 *            schema:
 *              type: 'object'
 *              properties:
 *                results:
 *                  type: 'object'
 *                  properties:
 *                    user:
 *                      type: 'object'
 *                      properties:
 *                        uid:
 *                          type: 'string'
 *      '400':
 *        description: Bad request. A mandatory field was not provided or the password is not strong enough.
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
 *        description: The username must be unique.
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
    validateJWT,
    requesterIsAdmin,
    body('username', '40001').notEmpty().trim(),
    body('username').custom(isValidUsername),
    body('password', '40001').notEmpty(),
    validateResults,
    roleIsNotAdmin,
    isValidPassword,
    sanitizeOptionalFields,
  ],
  createUser
);

/**
 * @swagger
 * /users/{uid}:
 *  put:
 *    tags:
 *      - users
 *    summary: Update User
 *    description: Update the user whose id matches the provided id. A user may update it's own password, and an admin may change any user password, Only an admin may change a users name or role. It's also imposible to give the admin role to any user through the API.
 *    parameters:
 *      - name: uid
 *        in: path
 *        description: Id of user to update.
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      content:
 *        application/JSON:
 *          schema:
 *            $ref: '#/components/schemas/userUpdateForm'
 *    responses:
 *      '200':
 *        description: OK. User updated successfully.
 *      '400':
 *        description: Bad request. No field was provided or the password is not strong enough.
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
 *    security:
 *    - bearerAuth: []
 */
router.put(
  '/:uid',
  [
    validateJWT,
    requesterIsAdminOrSelf,
    param('uid', '40003').isNumeric(),
    validateResults,
    isValidUpdateRequest,
  ],
  updateUser
);

/**
 * @swagger
 * /users/{uid}:
 *  delete:
 *    tags:
 *      - users
 *    summary: Delete User
 *    description: Deletes the user with the provided id.
 *    parameters:
 *      - name: uid
 *        in: path
 *        description: Id of the user to eliminate.
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: OK. User deleted successfully.
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
 *    security:
 *    - bearerAuth: []
 */
router.delete(
  '/:uid',
  [
    validateJWT,
    requesterIsAdmin,
    param('uid', '40003').isNumeric(),
    validateResults,
  ],
  deleteUser
);

export default router;
