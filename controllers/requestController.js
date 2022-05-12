const Request = require('../models/requestModel');

const x = 12;

// Route handlers
exports.getAllRequests = (req, res) => {
  const requests = ['Requests 1', 'Requests 2'];
  res.status(200).json({
    status: 'success',
    results: requests.length,
    data: requests,
  });
};
