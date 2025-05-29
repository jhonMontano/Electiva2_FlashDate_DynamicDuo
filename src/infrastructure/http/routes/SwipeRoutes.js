/**
 * @swagger
 * /swipes:
 *   post:
 *     summary: Registra un swipe (like o dislike) hacia otro usuario
 *     tags: [Swipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario que hace el swipe
 *                 example: 661fa2bc3cf3fa3b03ecad11
 *               targetUserId:
 *                 type: string
 *                 description: ID del usuario que recibe el swipe
 *                 example: 661fa2bc3cf3fa3b03ecad12
 *               action:
 *                 type: string
 *                 enum: [like, dislike]
 *                 description: Acción del swipe
 *                 example: like
 *     responses:
 *       200:
 *         description: Resultado del swipe (match o no)
 *       401:
 *         description: No autorizado (JWT no válido)
 */

/**
 * @swagger
 * /swipes/matches/{userId}:
 *   get:
 *     summary: Obtiene los matches del usuario
 *     tags: [Swipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de matches
 *       401:
 *         description: No autorizado (JWT no válido)
 */


const express = require("express");
const router = express.Router();

const SwipeRepository = require("../../persistence/SwipeRepository");
const MatchRepository = require("../../persistence/MatchRepository");
const SwipeService = require("../../../application/services/SwipeService");
const SwipeController = require("../controllers/SwipeController");
const authMiddleware = require("../middleware/authMiddleware");

module.exports = (io) => {
    const swipeRepository = new SwipeRepository();
    const matchRepository = new MatchRepository();
    const swipeService = new SwipeService(swipeRepository, matchRepository, io);
    const swipeController = new SwipeController(swipeService);

    router.post("/", authMiddleware, (req, res) => swipeController.swipe(req, res));
    router.get("/matches/:userId", authMiddleware, (req, res) => swipeController.getMatches(req, res));

    return router;
};

