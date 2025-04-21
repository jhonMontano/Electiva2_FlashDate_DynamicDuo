class MessageService {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }

    async sendMessage(data) {
        return await this.messageRepository.saveMessage(data);
    }

    async getMessages(roomId) {
        return await this.messageRepository.getMessagesByRoom(roomId);
    }
}

module.exports = MessageService;