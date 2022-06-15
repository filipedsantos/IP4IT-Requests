const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/signup', viewController.getSignUpForm);
router.get('/', authController.isLoggedIn, viewController.getRequests);

router.get(
  '/newRequest',
  // authController.isLoggedIn,
  authController.protect,
  viewController.getNewRequestForm
);

router.get('/admin', authController.protect, viewController.getAdminPage);
router.get('/hardware', authController.protect, viewController.getHardwarePage);

router.get('/:id', authController.protect, viewController.getEditRequestForm);

module.exports = router;
