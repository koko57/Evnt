const { check } = require('express-validator/check');

const validator = [
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Incorrect email format.'),

  check('username')
    .not()
    .isEmpty()
    .withMessage('Username is required!')
    .isLength({ min: 3, max: 12 })
    .withMessage('Username must be 3 to 12 characters long.')
    .isAlphanumeric()
    .withMessage('Username must contain letters or numbers.'),

  check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches('[0-9]')
    .withMessage('Password must contain at least 1 number.')
    .matches('[a-z]')
    .withMessage('Password must contain at least 1 lowercase letter.')
    .matches('[A-Z]')
    .withMessage('Password must contain at least 1 uppercase letter.')
];

module.exports = validator;
