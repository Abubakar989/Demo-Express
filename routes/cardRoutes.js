const express = require('express');
const router = express.Router();
const cardController = require('./../controllers/cardController');

/**
 * @swagger
 * components:
 *   schemas:
 *     NewCard:
 *       type: object
 *       required:
 *         - cardTitle
 *         - description
 *         - projectName
 *       properties:
 *         cardTitle:
 *           type: string
 *         description:
 *           type: string
 *         projectName:
 *           type: string
 *       example:
 *         cardTitle: Example Card
 *         description: This is an example card.
 *         projectName: Project 1
 *
 * /api/v1/cards:
 *   post:
 *     summary: Create a new card
 *     tags:
 *       - Cards
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:            
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 status:
 *                   type: string
 *                 projectName:
 *                   type: string
 *                 cardTitle:
 *                   type: string
 *                 description:
 *                   type: string
 *                 __v:
 *                   type: number
 *       '400':
 *         description: Bad request
 */

router.post('/', cardController.createCard);

/**
 * @swagger
 * /api/v1/card:
 *   get:
 *     summary: Get all cards On the basis of status
 *     tags:
 *       - Cards
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *    
 *       400:
 *         description: Bad request
 */
router.get('/', cardController.getAllCards);



module.exports = router;