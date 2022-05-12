const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Request needs to have a Person name!'],
    unique: true,
    trim: true,
    maxLength: [40, 'A Name must have less or equal then 40 characters!'],
    minLength: [4, 'A Name must have more or equal then 4 characters!'],
  },
  requestAt: {
    type: Date,
    default: Date.now(),
  },
  deliveredAt: Date,
  isOpen: {
    type: Boolean,
    default: true,
  },
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
