const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// router.post('/register', function(req, res, next) {
//   const newUser = new User({
//     username: req.body.username
//     // password: req.body.password,
//     // email: req.body.email
//   });
//   User.register(newUser, req.body.password, (err, user) => {
//     if (err) {
//       return next(err);
//     }
//       res.redirect('/');

// newUser.save();
// User.authenticate('local', req.body.username, req.body.password, function(err) {
//   err ? res.send(err)
//   : res.redirect('/');
// });
//   });
// });


// async login (req, res, next) {
//   // generate token
//   const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1200 });
//   // return token
//   return res.send({ token });
// },



router.post('/register', async function(req, res, next) {
  const { username, password, email } = req.body;
  const user = new User({ username, email });
  await User.register(user, password, function(err) {
    if (err) {
      console.log('error while user register!', err);
    }

    // passport.authenticate('local', {session: false}), async function(req, res, next) {
    //     // generate token
    //     const token = await jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1200 }).catch(err => res.send(err));
    //     // return token
    // }
  });
  return res.redirect('../');
  });


router.post('/login',async (req, res, next) => {
  try {
      if (!req.body.email || !req.body.password) {
          return res.status(400).json({
              message: 'Something is not right with your input'
          });
      }
      passport.authenticate('local', {session: false}, (err, user, info) => {
          if (err || !user) {
              return res.status(400).json({
                  message: err ? err : 'Something is not right',
                  user   : user ? user : 'no user'
              });
            }
          req.login(user, {session: false}, (err) => {
              if (err) {
                  res.send(err);
              }
              // generate a signed son web token with the contents of user object and return it in the response
              const token = jwt.sign({ id: user.id, user: user.email}, 'ILovePokemon');
              return res.json({user: user.email, token});
          });
      })(req, res);
  }
  catch(err){
      console.log(err);
  }

});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
module.exports = router;
