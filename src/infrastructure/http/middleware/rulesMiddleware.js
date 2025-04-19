const { query, body, param } = require('express-validator');
const { validationResult } = require('express-validator');

const getUserRules = [
    query('email').isEmail().escape()
];

const createUserRules = [
    body('email').notEmpty().isEmail(),
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString()
]

const UpdatedUserRules = [
    body('email').notEmpty().isEmail()
]

const deleteUserRules = [
    query('email').isEmail().escape()
];

const loginRules = [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const registerRules = [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').notEmpty().withMessage('Name is required')
];

const isValid = (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        res.status(422).json({
            error: result.array()
        })
    }else {
        next();
    }
}

const deleteUserByIdRules = [
    param("id").isMongoId().withMessage("Invalid user ID")
];

const getUserById = [
    param("id").isMongoId().withMessage("User not found")
];

module.exports = {getUserRules,
                 isValid,
                 createUserRules,
                 UpdatedUserRules,
                 deleteUserRules,
                 loginRules,
                 registerRules,
                 deleteUserByIdRules,
                 getUserById};