const mongoose = require('mongoose');

const hardwareSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: [true, 'A Hardware must have a TAG!'],
    unique: true,
    maxLength: [
      6,
      'A Hardaware TAG must have less or equal than 6 characters!',
    ],
    minLength: [
      5,
      'A Hardaware TAG must have more or equal then 5 characters!',
    ],
  },
  hardwareType: {
    type: String,
    required: [true, 'A Hardware must have a type!'],
    enum: ['Headset', 'Webcam', 'Other'],
  },
  inUse: {
    type: Boolean,
    default: false,
  },
});

const Hardware = mongoose.model('Hardware', hardwareSchema);
module.exports = Hardware;
