const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// =========================
// PORT
// =========================

const PORT = process.env.PORT || 3000;

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());

// =========================
// STATIC FRONTEND
// =========================

app.use(express.static(path.join(__dirname, 'public')));

// =========================
// SENSOR STORAGE
// =========================

let sensorData = {
  temperature: 0,
  humidity: 0,
  soil: 0,
  updatedAt: new Date()
};

// =========================
// RECEIVE SENSOR DATA
// =========================

app.post('/api/sensor', (req, res) => {

  const { temperature, humidity, soil } = req.body;

  if (
    temperature === undefined ||
    humidity === undefined ||
    soil === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: 'Missing sensor values'
    });
  }

  sensorData = {
    temperature,
    humidity,
    soil,
    updatedAt: new Date()
  };

  console.log('New Sensor Data:', sensorData);

  res.json({
    success: true,
    message: 'Sensor data received'
  });
});

// =========================
// SEND SENSOR DATA
// =========================

app.get('/api/sensor', (req, res) => {
  res.json(sensorData);
});

// =========================
// FRONTEND ROUTE
// =========================

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
