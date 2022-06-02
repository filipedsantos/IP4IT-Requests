const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      // 90 days defined -> *24H *60MIN * 60SEG * 1000Miliseconds
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.nextTick.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if email and password exists in the request
  if (!email || !password)
    return next(new AppError('Please provide email and password!', 400));

  // 2. Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect email or password!', 401));

  // 3. If everything ok, sent token to client
  // 3. If everything ok, send token to client
  createSendToken(user, 201, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    exprires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1. Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to have access!', 401)
    );
  }

  // 2. Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3. Check if user still exists
  const currentUser = await User.findById(decoded.id);

  // 4. Check if user has changed password after jwt was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again!', 401)
    );
  }

  // 5. GRANT access to protected route (next() lead to next middleware)
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.restrictTo = (...roles) =>
  catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return next(
        new AppError('You do not have permission to perform this action!', 403)
      );
    }
    next();
  });

exports.forgotPassword = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message:
      'Work in progress -- check if its possbible to send email to Gbn accounts?? IF not return token with this same API',
  });
});

exports.resetPassword = catchAsync(async (req, res, nexy) => {
  res.status(200).json({
    status: 'success',
    message: 'Work in progress',
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get User from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2. Get if POSTED password is correct
  if (!user.correctPassword(req.body.passwordCurrent, user.password)) {
    return next(new AppError('Your current pasword is wrong!', 401));
  }

  // 3. If all good Update Password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt && req.cookies.jwt !== 'loggedout') {
    try {
      // 1. Verificate token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2. Verify if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) return next();

      // 3. Check if user changed password after jwt was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) return next();

      // 4. Return the user loggedIn
      res.locals.user = currentUser;
      return next();
    } catch (error) {
      next();
    }
  }
  next();
};
