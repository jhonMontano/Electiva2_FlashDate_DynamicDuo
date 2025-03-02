const express = require('express');
const { getUsers, getUserByEmail, postUsers, updateUser, deleteUser} = require('../controllers/users');


const {getUserRules, isValid, createUserRules} = require('../middleware/errors')

const router = express.Router();

router.get('/users', getUserRules, isValid, getUsers);

router.get('/users/:email', getUserByEmail);

router.post('/users', createUserRules, isValid, postUsers);

router.put('/users/:email', isValid, updateUser);

router.delete('/users/:email', isValid, deleteUser);

module.exports = router;    