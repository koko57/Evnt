const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');

router.post('/register', (req, res) => {
  AuthController.register(req, res);
});

router.post('/login', (req, res, next) => {
  AuthController.login(req, res, next);
});

router.get('/logout', (req, res) => {
  AuthController.logout();
});

module.exports = router;
