const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const events = require('./routes/events');
const auth = require('./routes/auth');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const expressValidator = require('express-validator');
const app = express();

const mongoURI = 'mongodb://koko:lama90@ds257372.mlab.com:57372/evnt';

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('connected to mlab'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(
  session({
    secret: 'haifhdlhafkdbacjsbickhsa',
    resave: false,
    saveUninitialized: false
  })
);

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    User.authenticate()
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ncnjznckz'
    },
    function(jwtPayload, cb) {
      return User.findById(jwtPayload.id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

app.use('/api/events', events);
app.use('/api/auth', auth);

const port = process.env.PORT || 5004;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
