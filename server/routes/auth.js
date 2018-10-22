const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


router.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser,
    req.body.password,
    (err, user) => {
      if (err) {
        return res.send(err);
      }
      passport.authenticate('local')
    }
  );
});

router.post('/login', function(req, res) {
  return res.send(req.body);
});

router.get('/logout', (req, res) => {
  res.logout();
});

module.exports = router;
