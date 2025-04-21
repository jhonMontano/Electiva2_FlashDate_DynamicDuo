class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }

    async getMessages(req, res) {
        try {
            const { roomId } = req.params;
            const messages = await this.messageService.getMessages(roomId);
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = MessageController;