const express = require('express');
const router = express.Router();
const chargingStationsController = require('../controllers/chargingStationsController');

router.get('/nearby', chargingStationsController.getNearbyStations);

module.exports = router;
