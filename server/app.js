const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const events = require('./routes/events');
const auth = require('./routes/auth');

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
  require('express-session')({
    secret: 'haifhdlhafkdbacjsbickhsa',
    resave: false,
    saveUninitialized: false
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/events', events);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
