class Message {
    constructor({ senderId, receiverId, content, roomId }) {
        this.senderId = senderId,
            this.receiverId = receiverId,
            this.content = content,
            this.roomId = roomId
    }
}

module.exports = Message;