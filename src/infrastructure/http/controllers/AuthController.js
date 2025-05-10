class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async login(req, res) {
        try {
            const data = await this.authService.login(req.body.email, req.body.password);
            res.json({ message: "log in successfully", data });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

module.exports = AuthController;