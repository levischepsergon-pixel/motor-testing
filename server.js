const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// System Memory
let state = {
  action: "parking",
  active: false,
  lastUpdate: Date.now()
};

let telemetry = {
  temp: 0,
  hum: 0,
  timestamp: null
};

// DASHBOARD ENDPOINT: UI sends commands here
app.post("/control", (req, res) => {
  const { action, active } = req.body;
  state = { action, active, lastUpdate: Date.now() };
  console.log(`[COMMAND] ${action.toUpperCase()} - Active: ${active}`);
  res.json({ status: "applied", state });
});

// HARDWARE ENDPOINT: ESP32 polls this every 150ms
app.get("/control", (req, res) => {
  res.json(state);
});

// TELEMETRY ENDPOINT: ESP32 sends DHT11 data here
app.post("/sensors", (req, res) => {
  telemetry = { 
    temp: req.body.temp, 
    hum: req.body.hum, 
    timestamp: new Date().toLocaleString() 
  };
  console.log(`[FARM DATA] Temp: ${telemetry.temp}°C | Hum: ${telemetry.hum}%`);
  res.json({ status: "logged" });
});

// UI ENDPOINT: To display sensor data on your dashboard
app.get("/telemetry", (req, res) => {
  res.json(telemetry);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Limika Cloud Engine 1.0 - Port ${PORT}`));
