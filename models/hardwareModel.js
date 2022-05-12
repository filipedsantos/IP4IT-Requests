const mongoose = require('mongoose');

const hardwareSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: [true, 'A Hardware must have a TAG!'],
    unique: true,
  },
  inUse: {
    type: Boolean,
    default: false,
  },
});

const Hardware = mongoose.model('Hardware', hardwareSchema);
module.exports = Hardware;
