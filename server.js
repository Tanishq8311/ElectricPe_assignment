const express = require('express');
const app = express();
const chargingStationsRoutes = require('./routes/chargingStationsRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const chargingSessionsRoutes = require('./routes/chargingSessionsRoutes');

app.use(express.json()); // For parsing application/json
app.use('/charging-stations', chargingStationsRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/charging-sessions', chargingSessionsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
