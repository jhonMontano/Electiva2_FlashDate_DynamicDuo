const express = require('express');
const { getUsers, getUserByEmail, postUsers, updateUser, deleteUser} = require('../controllers/users');
const {login, register} = require('../controllers/auth');

const {getUserRules, isValid, createUserRules,  loginRules, registerRules,} = require('../middleware/errors')

const router = express.Router();

router.get('/users', getUserRules, isValid, getUsers);

router.get('/users/:email', getUserByEmail);

router.post('/users', createUserRules, isValid, postUsers);

router.put('/users/:email', isValid, updateUser);

router.delete('/users/:email', isValid, deleteUser);

module.exports = router;    