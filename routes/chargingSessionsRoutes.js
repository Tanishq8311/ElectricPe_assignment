const express = require('express');
const router = express.Router();
const chargingSessionsController = require('../controllers/chargingSessionsController');

router.post('/start', chargingSessionsController.startChargingSession);
router.post('/end', chargingSessionsController.endChargingSession);

module.exports = router;
