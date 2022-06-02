const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getRequests);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/signup', viewController.getSignUpForm);
router.get(
  '/newRequest',
  authController.isLoggedIn,
  viewController.getNewRequestForm
);

router.get(
  '/:id',
  authController.isLoggedIn,
  viewController.getEditRequestForm
);

module.exports = router;
