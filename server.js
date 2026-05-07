const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let systemState = { action: "parking", active: false };
let farmTelemetry = { temp: 0, hum: 0, lastSync: "Never" };

// Motor Logic
app.get("/control", (req, res) => res.json(systemState));
app.post("/control", (req, res) => {
    systemState = { action: req.body.action, active: req.body.active };
    res.json({ status: "ok" });
});

// DHT11 Logic
app.post("/sensors", (req, res) => {
    farmTelemetry = { 
        temp: req.body.temp, 
        hum: req.body.hum, 
        lastSync: new Date().toLocaleTimeString() 
    };
    console.log(`[DATA] ${farmTelemetry.temp}°C | ${farmTelemetry.hum}%`);
    res.json({ status: "logged" });
});

app.get("/telemetry", (req, res) => res.json(farmTelemetry));

app.listen(process.env.PORT || 3000, () => console.log("Limika Engine Online"));
