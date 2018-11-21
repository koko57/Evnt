const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');
const validator = require('../helpers/validation');
const { validationResult } = require('express-validator/check');

router.post('/register', validator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
  } else {
    AuthController.register(req, res);
  }
});

router.post('/login', (req, res, next) => {
  AuthController.login(req, res, next);
});

router.get('/logout', (req, res) => {
  AuthController.logout();
});

module.exports = router;
