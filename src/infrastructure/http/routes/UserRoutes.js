/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               name:
 *                 type: string
 *                 example: Leonidas
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       422:
 *         description: Error de validación
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const UserRepository = require("../../persistence/UserRepository");
const UserService = require("../../../application/services/UserService");
const {registerRules, isValid, deleteUserByIdRules, getUserById} = require("../middleware/rulesMiddleware");

const db = {};
const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const upload = require("../middleware/uploadMiddleware");

router.post(
  "/register",
  upload.single("profilePhoto"),
  registerRules,
  isValid,
  (req, res) => userController.register(req, res)
);

router.get("/", (req, res) => userController.getAll(req, res));
router.get("/:id", getUserById, (req, res) => userController.getUserById(req, res));
router.delete("/delete/:id", deleteUserByIdRules, isValid, (req, res) => userController.deleteUser(req, res));

module.exports = router;