const chargingStations = require('../models/chargingStations');

// Haversine formula to calculate the distance between two points on the Earth
function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

exports.getNearbyStations = (req, res) => {
  const { latitude, longitude, radius = 10 } = req.query;
  if (!latitude || !longitude) {
    return res.status(400).send('Latitude and longitude are required.');
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);
  const rad = parseFloat(radius);

  const nearbyStations = chargingStations.filter(station => {
    const distance = getDistance(lat, lon, station.latitude, station.longitude);
    return distance <= rad;
  });
  if (nearbyStations.length === 0) {
    return res.status(404).send('No charging stations found within the specified radius.Try changing your radius');
    }
  res.json(nearbyStations);
};
