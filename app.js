const path = require('path');
const express = require('express');
const morgan = require('morgan');

const requestRouter = require('./routes/requestRoutes');
const userRoute = require('./routes/userRoutes');
const hardwareRoute = require('./routes/hardwareRoutes');
const AppError = require('./utils/appError');

const viewRouter = require('./routes/viewRouter');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Global Middleware

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Morgan -> logging middleware
// EX.: GET /api/v1/requests 200 6.421 ms - 67
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

// Routes
app.use('/', viewRouter);
app.use('/api/v1/requests', requestRouter);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/hardware', hardwareRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
