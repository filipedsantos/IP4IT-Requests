const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewController.getIndex);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/newRequest', viewController.getNewRequestForm);

module.exports = router;
