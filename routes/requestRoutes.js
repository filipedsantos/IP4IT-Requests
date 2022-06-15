const express = require('express');

const authController = require('../controllers/authController');
const requestController = require('../controllers/requestController');

const router = express.Router();

router.use(authController.protect);

router.route('/finishRequest/:id').patch(requestController.finishRequest);

router
  .route('/')
  .get(requestController.getAllRequests)
  .post(requestController.createRequest);

router
  .route('/:id')
  .get(requestController.getOneRequest)
  .patch(requestController.updateRequest)
  .delete(requestController.deleteRequest);

module.exports = router;
