const catchAsync = require('../utils/catchAsync');
const Hardware = require('../models/hardwareModel');

const Request = require('../models/requestModel');

exports.getIndex = catchAsync(async (req, res, next) => {
  const requests = await Request.find().sort({ isOpen: -1 }).populate({
    path: 'hardware',
    fields: 'tag',
  });

  res.status(200).render('index', {
    title: 'Welcome',
    requests,
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login Page',
  });
});

exports.getNewRequestForm = catchAsync(async (req, res, next) => {
  const hardware = await Hardware.find({ inUse: 'false' });

  res.status(200).render('newRequest', {
    title: 'New Request',
    hardware,
  });
});
