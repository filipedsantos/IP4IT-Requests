const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');

const cors = require('cors');

const requestRouter = require('./routes/requestRoutes');
const userRoute = require('./routes/userRoutes');
const hardwareRoute = require('./routes/hardwareRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const viewRouter = require('./routes/viewRouter');

const app = express();

// Global Middlewares

// Implement CORS
// Access-Control-Allow-Origin *
app.use(cors());

// Set Security HTTP Headers
app.use(helmet({ contentSecurityPolicy: false }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Global Middleware

// Development logging
// EX.: GET /api/v1/requests 200 6.421 ms - 67
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Limit requests from same IP, to prevent brute force attacks
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
// Body greater than 10kb is ignored
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// Routes
app.use('/', viewRouter);
app.use('/api/v1/requests', requestRouter);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/hardware', hardwareRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
