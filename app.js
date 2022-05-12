const express = require('express');
const morgan = require('morgan');

const requestRouter = require('./routes/requestRoutes');

const app = express();

// Morgan -> logging middleware
// EX.: GET /api/v1/requests 200 6.421 ms - 67
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

// Routes
app.use('/api/v1/requests', requestRouter);

module.exports = app;
