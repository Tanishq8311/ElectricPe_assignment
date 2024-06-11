EV Charging API
This is an Express.js server that provides an API for managing electric vehicle (EV) charging stations, booking slots, and handling charging sessions. The project is structured in an MVC format and uses hardcoded data for simplicity.

Project Structure
Copy code
my-ev-charging-api/
├── controllers/
│   ├── chargingStationsController.js
│   ├── bookingsController.js
│   └── chargingSessionsController.js
├── models/
│   ├── chargingStations.js
│   ├── bookings.js
│   └── chargingSessions.js
├── routes/
│   ├── chargingStationsRoutes.js
│   ├── bookingsRoutes.js
│   └── chargingSessionsRoutes.js
└── app.js

Setup
Initialize a new npm project if you haven't already:

sh
Copy code
npm init -y
Install Express:

sh
Copy code
npm install express
Create the folder structure and files as shown above.

Run the server:

sh
Copy code
node app.js
API Endpoints
Get Nearby Charging Stations
Endpoint: GET /charging-stations/nearby

Description: Retrieves a list of nearby charging stations within a specified radius.

Parameters:

latitude (required): Latitude of the current location.
longitude (required): Longitude of the current location.
radius (optional): Radius in kilometers to search for charging stations. Default is 10 km.
Example Request:

bash
Copy code
GET /charging-stations/nearby?latitude=40.712776&longitude=-74.005974&radius=10
Response:

json
Copy code
[
  { "id": 1, "name": "Station 1", "latitude": 40.712776, "longitude": -74.005974 },
  { "id": 2, "name": "Station 2", "latitude": 34.052235, "longitude": -118.243683 }
]
Book a Charging Slot
Endpoint: POST /bookings/book

Description: Books a charging slot for a specific station and time.

Request Body:

json
Copy code
{
  "stationId": 1,
  "slot": "2024-06-11T10:00:00"
}
Response:

201 Created: Slot booked successfully.
409 Conflict: Slot is already booked.
404 Not Found: Charging station not found.
400 Bad Request: Missing required fields.
Start a Charging Session
Endpoint: POST /charging-sessions/start

Description: Records the start time of a charging session.

Request Body:

json
Copy code
{
  "stationId": 1,
  "userId": 1,
  "slot": "2024-06-11T10:00:00",
  "startTime": "2024-06-11T10:05:00"
}
Response:

201 Created: Charging session started successfully.
404 Not Found: Booking not found.
400 Bad Request: Missing required fields.
End a Charging Session
Endpoint: POST /charging-sessions/end

Description: Records the end time of a charging session and notifies the user of the payment pending.

Request Body:

json
Copy code
{
  "stationId": 1,
  "userId": 1,
  "slot": "2024-06-11T10:00:00",
  "endTime": "2024-06-11T11:00:00"
}
Response:

200 OK: Charging session ended successfully. Payment is pending.
404 Not Found: Active charging session not found.
400 Bad Request: Missing required fields.
