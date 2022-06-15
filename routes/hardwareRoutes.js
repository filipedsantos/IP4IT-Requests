const express = require('express');

const authController = require('../controllers/authController');
const hardwareController = require('../controllers/hardwareController');

const router = express.Router();

router.use(authController.protect);

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
