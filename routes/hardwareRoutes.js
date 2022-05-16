const express = require('express');

const hardwareController = require('../controllers/hardwareController');

const router = express.Router();

// Define Hardware routes
router
  .route('/')
  .get(hardwareController.getAllHardware)
  .post(hardwareController.createHardware);

router
  .route('/:id')
  .patch(hardwareController.updateHardware)
  .delete(hardwareController.deleteHardware);

module.exports = router;
