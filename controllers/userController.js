const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');

const User = require('../models/userModel');

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

exports.createUser = catchAsync((req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route its not defined! Please use /signup instead!',
  });
});
