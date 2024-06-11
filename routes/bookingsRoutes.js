const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

router.post('/book', bookingsController.bookSlot);

module.exports = router;
