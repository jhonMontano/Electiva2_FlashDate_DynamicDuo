const SwipeService = require("../../src/application/services/SwipeService");

describe("SwipeService", () => {
  const mockSwipeRepo = {
    saveSwipe: jest.fn(),
  };

  const mockMatchRepo = {
    hasUserLikedBack: jest.fn(() => true),
    createMatch: jest.fn((a, b) => ({ match: true, users: [a, b] })),
  };

  const swipeService = new SwipeService(mockSwipeRepo, mockMatchRepo);

  it("It should create a match if there is a like mutual", async () => {
    const result = await swipeService.handleSwipe("user1", "user2", "like");
  
    expect(mockSwipeRepo.saveSwipe).toHaveBeenCalledWith({
      userId: "user1",
      targetUserId: "user2",
      action: "like"
    });
  
    expect(mockMatchRepo.hasUserLikedBack).toHaveBeenCalledWith("user1", "user2");
    expect(mockMatchRepo.createMatch).toHaveBeenCalledWith("user1", "user2");
    expect(result.match).toBe(true);
  });  
});
