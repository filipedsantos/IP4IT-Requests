const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');
const Hardware = require('../models/hardwareModel');

const Request = require('../models/requestModel');

exports.getRequests = catchAsync(async (req, res, next) => {
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

exports.getEditRequestForm = catchAsync(async (req, res, next) => {
  const request = await Request.find({ _id: req.params.id }).populate({
    path: 'hardware',
    fields: 'tag',
  });

  const hardware = await Hardware.find({ inUse: 'false' });

  res.status(200).render('editRequest', {
    title: 'Edit Request',
    request,
    hardware,
  });
});
