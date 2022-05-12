const express = require('express');

const requestController = require('../controllers/requestController');

const router = express.Router();
router.get('/', requestController.getAllRequests);

module.exports = router;
