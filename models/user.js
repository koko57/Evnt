const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
});

UserSchema.plugin(passportLocalMongoose, {
  selectFields: 'email username',
  usernameField: 'email'
});

module.exports = User = mongoose.model('user', UserSchema);
