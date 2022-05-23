const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewController.getRequests);
router.get('/login', viewController.getLoginForm);
router.get('/newRequest', viewController.getNewRequestForm);

router.get('/:id', viewController.getEditRequestForm);

module.exports = router;
