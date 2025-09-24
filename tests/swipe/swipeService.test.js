const SwipeService = require("../../src/application/services/SwipeService");

describe("SwipeService", () => {
  const mockSwipeRepo = {
    saveSwipe: jest.fn(),
  };
  
  
  const mockMatchRepo = {
    hasUserLikedBack: jest.fn(() => true),
    createMatch: jest.fn((a, b) => ({ match: true, users: [a, b] })),
  };

  const mockIo = {
    to: jest.fn(() => ({
      emit: jest.fn()
    }))
  };

  const swipeService = new SwipeService(mockSwipeRepo, mockMatchRepo, mockIo);

  it("It should create a match if there is a like mutual", async () => {
    const result = await swipeService.handleSwipe("user1", "user2", "like");
  
    expect(mockSwipeRepo.saveSwipe).toHaveBeenCalledWith({
      userId: "user1",
      targetUserId: "user2",
      action: "like"
    });
  
    expect(mockMatchRepo.hasUserLikedBack).toHaveBeenCalledWith("user1", "user2");
    expect(mockMatchRepo.createMatch).toHaveBeenCalledWith("user1", "user2");
    expect(mockIo.to).toHaveBeenCalledWith("user1");
    expect(mockIo.to).toHaveBeenCalledWith("user2");
    expect(result.match).toBe(true);
  });

  it("It should not create a match if there is no mutual like", async () => {
    // Reset the mock to return false for this test
    mockMatchRepo.hasUserLikedBack.mockReturnValueOnce(false);
    
    const result = await swipeService.handleSwipe("user1", "user3", "like");
  
    expect(mockSwipeRepo.saveSwipe).toHaveBeenCalledWith({
      userId: "user1",
      targetUserId: "user3",
      action: "like"
    });
  
    expect(mockMatchRepo.hasUserLikedBack).toHaveBeenCalledWith("user1", "user3");
    expect(mockMatchRepo.createMatch).not.toHaveBeenCalledWith("user1", "user3");
    expect(result.match).toBe(false);
  });

  it("It should not create a match for dislike action", async () => {
    const result = await swipeService.handleSwipe("user1", "user4", "dislike");
  
    expect(mockSwipeRepo.saveSwipe).toHaveBeenCalledWith({
      userId: "user1",
      targetUserId: "user4",
      action: "dislike"
    });
  
    expect(mockMatchRepo.hasUserLikedBack).not.toHaveBeenCalledWith("user1", "user4");
    expect(mockMatchRepo.createMatch).not.toHaveBeenCalledWith("user1", "user4");
    expect(result.match).toBe(false);
  });  
});
