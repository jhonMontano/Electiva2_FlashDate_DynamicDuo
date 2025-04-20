const request = require("supertest");
const express = require("express");
const userRoutes = require("../../src/infrastructure/http/routes/UserRoutes");

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

describe("User Routes", () => {
    it("It should return error 422 if the email is invalid", async () => {
        const response = await request(app)
        .post("/api/users/register")
        .send({
            email: "Email not valid",
            password: "123",
            name: ""
        });

        expect(response.statusCode).toBe(422);
        expect(response.body).toHaveProperty("error");
    });
});