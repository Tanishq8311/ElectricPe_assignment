const bookings = require('../models/bookings');
const chargingStations = require('../models/chargingStations');

exports.bookSlot = (req, res) => {
  const { stationId, slot } = req.body;

  // Validate input
  if (!stationId || !slot) {
    return res.status(400).send('Station ID and slot are required.');
  }

  // Check if the station exists
  const station = chargingStations.find(station => station.id === parseInt(stationId));
  if (!station) {
    return res.status(404).send('Charging station not found.');
  }

  // Check if the slot is already booked
  const existingBooking = bookings.find(booking => booking.stationId === parseInt(stationId) && booking.slot === slot);
  if (existingBooking) {
    return res.status(409).send('Slot is already booked.');
  }

  // Book the slot
  bookings.push({ stationId: parseInt(stationId), slot, booked: true });
  res.status(201).send('Slot booked successfully.');
};
