const Request = require('../models/requestModel');
const factory = require('../controllers/handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllRequests = factory.getAll(Request);
exports.createRequest = factory.createOne(Request);
exports.updateRequest = factory.updateOne(Request);
exports.deleteRequest = factory.deleteOne(Request);

exports.finishRequest = catchAsync(async (req, res, next) => {
  console.log(req.body);
  console.log(req.params);

  const updatedRequest = await Request.findById(req.params.id);
  updatedRequest.finishRequest();

  updatedRequest.save();

  res.status(200).json({
    status: 'success',
    data: {
      request: updatedRequest,
    },
  });
});
