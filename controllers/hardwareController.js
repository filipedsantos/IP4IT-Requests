const Hardware = require('../models/hardwareModel');
const factory = require('../controllers/handlerFactory');

exports.getAllHardware = factory.getAll(Hardware);
exports.createHardware = factory.createOne(Hardware);
exports.updateHardware = factory.updateOne(Hardware);
exports.deleteHardware = factory.deleteOne(Hardware);
