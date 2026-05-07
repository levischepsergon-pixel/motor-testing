const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let lastCommand = { action: "parking", active: true };
let sensors = { temperature: 0, humidity: 0 };

// Store motor command
app.post("/control", (req, res) => {
  lastCommand = req.body;
  console.log("Command received:", lastCommand);
  res.json({ status: "ok" });
});

// Return last motor command
app.get("/control", (req, res) => {
  res.json(lastCommand);
});

// Store sensor data from ESP32
app.post("/sensors", (req, res) => {
  sensors = req.body;
  console.log("Sensor data updated:", sensors);
  res.json({ status: "ok" });
});

// Return latest sensor data
app.get("/sensors", (req, res) => {
  res.json(sensors);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
