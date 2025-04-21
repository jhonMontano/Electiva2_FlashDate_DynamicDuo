/**
 * @swagger
 * /messages/{roomId}:
 *   get:
 *     summary: Obtener historial de mensajes por sala (roomId)
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sala del chat (match entre dos usuarios)
 *     responses:
 *       200:
 *         description: Lista de mensajes del chat
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   roomId:
 *                     type: string
 *                   senderId:
 *                     type: string
 *                   receiverId:
 *                     type: string
 *                   content:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Sala no encontrada
 */


const express = require("express");
const router = express.Router();

const MessageRepository = require("../../persistence/MessageRepository");
const MessageService = require("../../../application/services/MessageService");
const MessageController = require("../controllers/MessageController");
const authMiddleware = require("../middleware/authMiddleware");
const { isValid, getMessagesRules } = require("../middleware/rulesMiddleware");

const messageRepo = new MessageRepository();
const messageService = new MessageService(messageRepo);
const messageController = new MessageController(messageService);

router.get("/:roomId", authMiddleware, isValid, getMessagesRules, (req, res) => messageController.getMessages(req, res));

router.post("/", async (req, res) => {
    try {
      const savedMessage = await messageService.sendMessage(req.body);
      res.status(201).json(savedMessage);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router;