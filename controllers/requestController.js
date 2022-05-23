const Request = require('../models/requestModel');
const factory = require('../controllers/handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllRequests = factory.getAll(Request);
// exports.createRequest = factory.createOne(Request);
exports.getOneRequest = factory.getOne(Request);
exports.updateRequest = factory.updateOne(Request);
exports.deleteRequest = factory.deleteOne(Request);

exports.createRequest = catchAsync(async (req, res, next) => {
  const newRequest = await Request.create(req.body);
  newRequest.updateHardwareToUsed();

  res.status(201).json({
    status: 'success',
    data: newRequest,
  });
});

exports.finishRequest = catchAsync(async (req, res, next) => {
  const updateRequest = await Request.findById(req.params.id);
  updateRequest.setRequestToFinish();
  updateRequest.save();

  res.status(200).json({
    status: 'success',
    data: {
      request: updateRequest,
    },
  });
});
