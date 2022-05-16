const express = require('express');
const morgan = require('morgan');

const requestRouter = require('./routes/requestRoutes');
const userRoute = require('./routes/userRoutes');

const app = express();

// Morgan -> logging middleware
// EX.: GET /api/v1/requests 200 6.421 ms - 67
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

// Routes
app.use('/api/v1/requests', requestRouter);
app.use('/api/v1/users', userRoute);

module.exports = app;
