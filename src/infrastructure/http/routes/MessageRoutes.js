const express = require("express");
const router = express.Router();

const MessageRepository = require("../../persistence/MessageRepository");
const MessageService = require("../../../application/services/MessageService");
const MessageController = require("../controllers/MessageController");

const messageRepo = new MessageRepository();
const messageService = new MessageService(messageRepo);
const messageController = new MessageController(messageService);

router.get("/:roomId", (req, res) => messageController.getMessages(req, res));

module.exports = router;