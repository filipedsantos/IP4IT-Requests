const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name!'],
    unique: true,
    trim: true,
    maxLength: [40, 'A User name must have less or equal than 40 characters!'],
    minLength: [4, 'A User name must have more or equal then 4 characters!'],
  },
  username: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: String,
  passwordConfirm: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
