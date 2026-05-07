const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Initial State
let systemState = { action: "parking", active: false };
let telemetry = { temp: 0, hum: 0, soil: 0, time: "Pending" };

// 1. ESP32 & Website get movement commands here
app.get("/control", (req, res) => res.json(systemState));

// 2. Website sends commands here
app.post("/control", (req, res) => {
    systemState = { action: req.body.action, active: req.body.active };
    console.log(`[VANGUARD] New Command: ${systemState.action}`);
    res.json({ status: "success" });
});

// 3. ESP32 uploads Farm Data here
app.post("/sensors", (req, res) => {
    telemetry = { 
        temp: req.body.temp, 
        hum: req.body.hum, 
        soil: req.body.soil,
        time: new Date().toLocaleTimeString() 
    };
    console.log(`[DATA] T:${telemetry.temp}C | H:${telemetry.hum}% | Soil:${telemetry.soil}%`);
    res.json({ status: "logged" });
});

// 4. Website fetches Telemetry here
app.get("/telemetry", (req, res) => res.json(telemetry));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Limika Engine 3.0 Live"));
