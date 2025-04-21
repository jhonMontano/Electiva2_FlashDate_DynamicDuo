const IUmessageRepository = require("../../domain/repositories/IUmessageRepository");
const MessageModel = require("./model/MessageModel");

class MessageRepository extends IUmessageRepository {
    async saveMessage(messageData) {
        return await MessageModel.create(messageData);
    }

    async getMessagesByRoom(roomId) {
        return await MessageModel.find({ roomId }).sort({ createdAt: 1 });
    }
}

module.exports = MessageRepository;