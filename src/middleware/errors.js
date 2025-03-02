const { query, body } = require('express-validator');
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

module.exports = {getUserRules,
                 isValid,
                 createUserRules,
                 UpdatedUserRules,
                 deleteUserRules};