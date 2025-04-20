require("dotenv").config();
const AuthService = require("../../src/application/services/AuthService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("AuthService", () => {
    const mockUser = {
        _id: "user123",
        name: "jhon",
        email: "jhon@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        location: { country: "Colombia" }
    };

    const mockRepo = {
        findByEmail: jest.fn((email) => email === mockUser.email ? mockUser : null)
    };

    const authService = new AuthService(mockRepo);

    it("It should generate token if the credentials are valids", async () => {
        const result = await authService.login("jhon@gmail.com", "123456");
        expect(result).toHaveProperty("token");
        expect(result.user.email).toBe("jhon@gmail.com");
      });

      it("It should show an error if the password is incorrect", async () => {
        await expect(authService.login("jhon@gmail.com", "wrong"))
          .rejects.toThrow("Incorrect password");
      });
});