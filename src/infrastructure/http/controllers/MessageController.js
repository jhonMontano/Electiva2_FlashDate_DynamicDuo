class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }

    async getMessages(req, res) {
        try {
            const { roomId } = req.params;

            if (!roomId) {
                return res.status(400).json({ message: 'roomId is required' });
            }

            console.log(`Fetching messages for room: ${roomId}`);

            const messages = await this.messageService.getMessages(roomId);
            res.status(200).json(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = MessageController;
