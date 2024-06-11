const express = require('express');
const app = express();
const chargingStationsRoutes = require('./routes/chargingStationsRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const chargingSessionsRoutes = require('./routes/chargingSessionsRoutes');

app.use(express.json()); // For parsing application/json
app.use('api/charging-stations', chargingStationsRoutes);
app.use('api/bookings', bookingsRoutes);
app.use('api/charging-sessions', chargingSessionsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
