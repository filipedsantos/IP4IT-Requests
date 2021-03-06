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
    requestAt: { type: Date, default: Date.now },
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
    responsable: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A request must contain the IT responsable!'],
    },
  }, // Schema Options to show up virtual properties in JSON and Object outputs.
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Document middleware

requestSchema.pre('save', function (next) {
  // this.requestAt = Date.now();
  this.populate('responsable');
  // console.log(this.requestAt);
  next();
});

requestSchema.methods.setRequestToFinish = function () {
  this.isOpen = false;
  this.deliveredAt = Date.now();
  this.constructor.updateHardwareToBeNotUse(this.hardware);
};

requestSchema.methods.updateHardwareToUsed = function () {
  this.constructor.updateHardwareToBeInUse(this.hardware);
};

requestSchema.statics.updateHardwareToBeInUse = async function (hardwIds) {
  for (const h of hardwIds) {
    const hs = await Hardware.findByIdAndUpdate(h._id, {
      inUse: true,
    });
  }
};

requestSchema.statics.updateHardwareToBeNotUse = async function (hardwIds) {
  for (const h of hardwIds) {
    const hs = await Hardware.findByIdAndUpdate(h._id, {
      inUse: false,
      $inc: { timesUsed: 1 },
    });
  }
};

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
