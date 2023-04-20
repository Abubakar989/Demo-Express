const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');


/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *       example:
 *         email: user@example.com
 *         password: examplePassword123
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *
 * /api/v1/users/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       '401':
 *         description: Unauthorized
 */

router.post('/login', authController.login);

/**
 * @swagger
 * components:
 *   schemas:
 *     SignupRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         name:
 *           type: string
 *       example:
 *         email: user@example.com
 *         password: examplePassword123
 *         passwordConfirm: examplePassword123
 *         name: John Doe
 *
 *     SignupResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *
 * /api/v1/users/signup:
 *   post:
 *     summary: Signup user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignupResponse'
 *       '400':
 *         description: Bad Request
 *       '409':
 *         description: Conflict
 */

router.post('/signup', authController.signup);

/**
 * @swagger
 * components:
 *   schemas:
 *     ForgotPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *       example:
 *         email: user@example.com
 *
 *     ForgotPasswordResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *
 * /api/v1/users/forgotPassword:
 *   post:
 *     summary: Send reset code to user email address
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgotPasswordResponse'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not Found
 */

router.post('/forgotPassword', authController.forgotPassword);

/**
 * @swagger
 * /api/v1/users/resetPassword:
 *   post:
 *     summary: Reset user password using a confirmation code
 *     tags:
 *       - Authentication
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address associated with the user's account
 *                 example: johndoe@example.com
 *               code:
 *                 type: string
 *                 description: The confirmation code sent to the user's email address
 *                 example: 123456
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The new password to be set for the user's account
 *                 example: newpassword123
 *               passwordConfirm:
 *                 type: string
 *                 format: password
 *                 description: The new password confirmation to be set for the user's account
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 token:
 *                   type: string
 *                   description: JWT token used for authenticating future requests
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjViMmM0YzA1Y2I5MDAxNjFmZWI2NSIsImlhdCI6MTYxOTIzNzQwNiwiZXhwIjoxNjIyNTg5NDA2fQ.j9XzU6FEmU6p0w6Sz-nT6lxQZsHZ0HQ3iLVE0nNEU9A
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       description: The user object with the updated information
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 5ff5b2c4c05cb900161feb65
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: johndoe@example.com
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         passwordResetCode:
 *                           type: string
 *                           example: d5b63dc5b5f5aa2a5beee61d8e16f7d0861ec91222aa15c430d5b5c5b5b5c5b5
 *                         passwordResetExpiresAt:
 *                           type: string
 *                           example: 2023-04-20T12:00:00.000Z
 *                         createdAt:
 *                           type: string
 *                           example: 2021-01-06T15:18:12.865Z
 *                         updatedAt:
 *                           type: string
 *                           example: 2021-04-20T10:14:28.234Z
 *       400:
 *         description: Bad request
 *         content:
 *          
*/
router.post('/resetPassword', authController.confirmCodeAndResetPassword);



module.exports = router;