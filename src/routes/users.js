const express = require('express');
const { getUsers, getUserByEmail, postUsers, updateUser, deleteUser} = require('../controllers/users');
const {login, register} = require('../controllers/auth');

const {getUserRules, isValid, createUserRules,  loginRules, registerRules,} = require('../middleware/errors')
const express = require("express");
const {
  getUsers,
  getUserByEmail,
  postUsers,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const {
  getUserRules,
  isValid,
  createUserRules,
} = require("../middleware/errors");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Operaciones relacionadas con los usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: "usuario@example.com"
 *         firstName:
 *           type: string
 *           example: "Juan"
 *         lastName:
 *           type: string
 *           example: "Pérez"
 *         address:
 *           type: string
 *           example: "123 Main Street, New York, NY"
 *         phone:
 *           type: string
 *           example: "+1-555-1234"
 *     NewUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: "nuevo@example.com"
 *         name:
 *           type: string
 *           example: "Nuevo Usuario"
 *     UpdateUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Usuario Actualizado"
 *         newEmail:
 *           type: string
 *           example: "usuario_actualizado@example.com"
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "User not found"
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     description: Devuelve la lista de usuarios almacenados en el JSON.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/users", getUserRules, isValid, getUsers);

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Obtiene un usuario por email
 *     tags: [Usuarios]
 *     description: Busca y devuelve un usuario por su dirección de correo electrónico.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del usuario a buscar.
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/users/:email", getUserByEmail);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     description: Agrega un nuevo usuario a la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Created user"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Error en la validación de datos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/users", createUserRules, isValid, postUsers);

/**
 * @swagger
 * /users/{email}:
 *   put:
 *     summary: Actualiza un usuario por email
 *     tags: [Usuarios]
 *     description: Modifica la información de un usuario existente.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del usuario a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/users/:email", isValid, updateUser);

/**
 * @swagger
 * /users/{email}:
 *   delete:
 *     summary: Elimina un usuario por email
 *     tags: [Usuarios]
 *     description: Borra un usuario específico de la base de datos.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del usuario a eliminar.
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User with email usuario@example.com deleted successfully"
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/users/:email", isValid, deleteUser);

module.exports = router;
