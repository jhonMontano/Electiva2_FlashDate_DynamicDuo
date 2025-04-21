const MessageService = require("../../src/application/services/MessageService");

describe("MessageService", () => {
    const mockMessageRepo = {
        saveMessage: jest.fn((data) => ({ id: "msg123", ...data })),
        getMessagesByRoom: jest.fn((roomId) => [{ roomId, content: "Hello" }]),
    };

    const messageService = new MessageService(mockMessageRepo);

    it("It should save a message", async () => {
        const msg = await messageService.sendMessage({
            roomId: "match_123",
            senderId: "user1",
            receiverId: "user2",
            content: "Hello"
        });

        expect(mockMessageRepo.saveMessage).toHaveBeenCalled();
        expect(msg).toHaveProperty("id");
        expect(msg.content).toBe("Hello")
    });

    it("It should return messages for roomId", async () => {
        const result = await messageService.getMessages("match_123");
        expect(result[0].roomId).toBe("match_123");
    });
});