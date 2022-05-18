const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, 'A Request needs to have a User!'],
      trim: true,
      maxLength: [40, 'A Name must have less or equal then 40 characters!'],
      minLength: [4, 'A Name must have more or equal then 4 characters!'],
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    requestAt: {
      type: Date,
      default: Date.now(),
    },
    deliveredAt: Date,
    hardware: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Hardware',
        required: [
          true,
          'A Request needs to have at least 1 piece of Hardware',
        ],
      },
    ],
  }, // Schema Options to show up virtual properties in JSON and Object outputs.
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

requestSchema.methods.finishRequest = function () {
  this.isOpen = false;
  this.deliveredAt = Date.now();
};

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
