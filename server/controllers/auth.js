const User = require('../models/user');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const AuthController = {};

AuthController.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    User.register(
      new User({
        username: email
      }),
      password,
      err => {
        if (err) {
          return res.status(500).send('Error: ' + err);
        }
        passport.authenticate('local', {
          session: false
        })(req, res, () => {
          res.status(200).send('New account created');
        });
      }
    );
  } catch (err) {
    return res.status(500).send('Error: ' + err);
  }
};

AuthController.login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'Something is not right with your input'
      });
    }
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Invalid username'
        });
      }
      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err);
        }
        const token = jwt.sign(
          { id: user.id, email: user.username },
          'secretkey'
        );
        return res.send({ user, token });
      });
    })(req, res);
  } catch (err) {
    console.log(err);
  }
};

AuthController.logout = async (req, res) => {
  req.logout();
  console.log('loggedOut');
  res.status(200).send('Successfully logged out');
};

module.exports = AuthController;
