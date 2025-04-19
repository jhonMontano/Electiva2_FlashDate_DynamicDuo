class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const result = await this.authService.login(email, password);

            return res.status(200).json({
                message: "log in successfully",
                data: result
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = AuthController;