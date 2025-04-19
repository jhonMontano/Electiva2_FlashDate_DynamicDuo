/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo del usuario
 *                 example: leonidas@esparta.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login exitoso con token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *                   description: Token JWT de sesión
 *       400:
 *         description: Credenciales inválidas
 *       404:
 *         description: Usuario no encontrado
 */

const express = require("express");
const router = express.Router();

const UserRepository = require("../../persistence/AuthRepository");
const AuthService = require("../../../application/services/AuthService");
const AuthController = require("../controllers/AuthController");
const { loginRules, isValid} = require("../middleware/rulesMiddleware");

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/login",loginRules, isValid, (req, res) => authController.login(req, res));

module.exports = router;