const mongoose = require('mongoose');

const hardwareSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: [true, 'A Hardware must have a TAG!'],
    unique: true,
    maxLength: [6, 'A Hardware TAG must have less or equal than 6 characters!'],
    minLength: [5, 'A Hardware TAG must have more or equal then 5 characters!'],
  },
  hardwareType: {
    type: String,
    required: [true, 'A Hardware must have a type!'],
    enum: ['Headset', 'Webcam', 'Other'],
  },
  // Variable to store if Hardware it's disponible to use
  inUse: {
    type: Boolean,
    default: false,
  },
  // Variable to store if Hardware it's in available or has been deleted
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  timesUsed: {
    type: Number,
    default: 0,
  },
});

const Hardware = mongoose.model('Hardware', hardwareSchema);
module.exports = Hardware;
