const express = require('express');

const requestController = require('../controllers/requestController');

const router = express.Router();

router.route('/finishRequest/:id').patch(requestController.finishRequest);

router
  .route('/')
  .get(requestController.getAllRequests)
  .post(requestController.createRequest);

router
  .route('/:id')
  .patch(requestController.updateRequest)
  .delete(requestController.deleteRequest);

module.exports = router;
