const Request = require('../models/requestModel');
const factory = require('../controllers/handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Hardware = require('../models/hardwareModel');

exports.getAllRequests = factory.getAll(Request);
// exports.createRequest = factory.createOne(Request);
exports.getOneRequest = factory.getOne(Request);
// exports.updateRequest = factory.updateOne(Request);
exports.deleteRequest = factory.deleteOne(Request);

exports.createRequest = catchAsync(async (req, res, next) => {
  req.body.responsable = req.user;

  const newRequest = await Request.create(req.body);
  newRequest.updateHardwareToUsed();

  res.status(201).json({
    status: 'success',
    data: newRequest,
  });
});

exports.updateRequest = catchAsync(async (req, res, next) => {
  const reqToUpdate = await Request.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!reqToUpdate) {
    return next(new AppError('No document found with thar ID', 404));
  }

  reqToUpdate.updateHardwareToUsed();

  res.status(200).json({
    status: 'success',
    data: { data: reqToUpdate },
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
