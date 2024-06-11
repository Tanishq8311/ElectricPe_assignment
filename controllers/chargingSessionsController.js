const chargingSessions = require('../models/chargingSessions');
const bookings = require('../models/bookings');

exports.startChargingSession = (req, res) => {
  const { stationId, userId, slot, startTime } = req.body;

  // Validate input
  if (!stationId || !userId || !slot || !startTime) {
    return res.status(400).send('Station ID, user ID, slot, and start time are required.');
  }

  // Check if the booking exists
  const booking = bookings.find(booking => booking.stationId === parseInt(stationId) && booking.slot === slot);
  if (!booking) {
    return res.status(404).send('Booking not found.');
  }

  // Record the start time
  chargingSessions.push({ stationId: parseInt(stationId), userId: parseInt(userId), slot, startTime, endTime: null, paymentPending: false });
  res.status(201).send('Charging session started successfully.');
};

exports.endChargingSession = (req, res) => {
  const { stationId, userId, slot, endTime } = req.body;

  // Validate input
  if (!stationId || !userId || !slot || !endTime) {
    return res.status(400).send('Station ID, user ID, slot, and end time are required.');
  }

  // Find the session
  const sessionIndex = chargingSessions.findIndex(session => 
    session.stationId === parseInt(stationId) && 
    session.userId === parseInt(userId) && 
    session.slot === slot &&
    session.endTime === null
  );

  if (sessionIndex === -1) {
    return res.status(404).send('Active charging session not found.');
  }

  // Update the session with end time and payment pending status
  chargingSessions[sessionIndex].endTime = endTime;
  chargingSessions[sessionIndex].paymentPending = true;

  res.status(200).send('Charging session ended successfully. Payment is pending.');
};
