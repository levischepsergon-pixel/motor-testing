const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Simulated sensor data
let sensors = { temperature: 25, humidity: 60 };

// Motor control route
app.post("/control", (req, res) => {
  const { action } = req.body;
  console.log("Received command:", action);

  // Example motor logic
  switch(action) {
    case "forward":
      console.log("Both motors forward");
      break;
    case "reverse":
      console.log("Both motors reverse");
      break;
    case "parking":
      console.log("Motors stopped");
      break;
    case "left":
      console.log("Right motor ON, Left motor OFF");
      break;
    case "right":
      console.log("Left motor ON, Right motor OFF");
      break;
  }
  res.json({ status: "ok", action });
});

// Sensor data route
app.get("/sensors", (req, res) => {
  // Replace with actual sensor read logic
  sensors.temperature = 25 + Math.random() * 5;
  sensors.humidity = 50 + Math.random() * 10;
  res.json(sensors);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
