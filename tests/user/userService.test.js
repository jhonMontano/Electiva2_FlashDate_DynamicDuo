const UserService = require("../../src/application/services/UserService");

describe("UserService", () => {
  it("It should save a user using a repository with mock", async () => {
    const mockRepo = {
      save: jest.fn((user) => ({ id: "abc123", ...user }))
    };

    const userService = new UserService(mockRepo);

    const user = await userService.registerUser({
      name: "Jhon",
      email: "jhon@test.com",
      password: "123456"
    });

    expect(mockRepo.save).toHaveBeenCalled();
    expect(user).toHaveProperty("id");
    expect(user.name).toBe("Jhon");
  });
});
