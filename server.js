const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// This variable acts as the "Memory" for Limika
let currentCommand = { action: "parking", active: false };

// ROUTE 1: Your Dashboard calls this to set a movement
app.post("/control", (req, res) => {
  const { action, active } = req.body;
  currentCommand = { action, active }; 
  console.log("New Command Stored:", action);
  res.json({ status: "Success", stored: currentCommand });
});

// ROUTE 2: Your ESP32 calls this to ask "What should I do?"
app.get("/control", (req, res) => {
  res.json(currentCommand);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Limika Server Live on Port ${PORT}`));
