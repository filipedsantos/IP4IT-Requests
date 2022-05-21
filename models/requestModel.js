const mongoose = require('mongoose');
const Hardware = require('../models/hardwareModel');

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
    // Hardware -> Array,
    // implementing by reference
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

// Document middleware

requestSchema.pre('save', function (next) {
  this.requestAt = Date.now();
  // console.log(this.requestAt);
  next();
});

requestSchema.post('save', function () {
  this.constructor.updateHardwareToBeUsed(this.hardware);
});

requestSchema.methods.setFinishRequest = function () {
  this.isOpen = false;
  this.deliveredAt = Date.now();
};

requestSchema.statics.updateHardwareToBeUsed = async function (hardwIds) {
  console.log('--', hardwIds);

  for (const h of hardwIds) {
    console.log(h.timesUsed);
    const hs = await Hardware.findByIdAndUpdate(h._id, {
      inUse: true,
      $inc: { timesUsed: 1 },
    });

    console.log(hs);
  }

  // const usedHw = await this.agregate([{ $match: { hardware: hardwId } }]);
};

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
