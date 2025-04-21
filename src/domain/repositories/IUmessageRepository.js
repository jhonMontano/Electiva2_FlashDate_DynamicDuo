class IUmessageRepository {
    async saveMessage(message) {
        throw new Error("Method not impemented");
    }

    async getMessagesByRoom(roomId) {
        throw new Error("Method not implemented");
    }
}

module.exports = IUmessageRepository;