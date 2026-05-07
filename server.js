const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Global persistent state
let systemState = { 
    action: "parking", 
    active: false 
};

let sensorLogs = { 
    temp: "0", 
    hum: "0", 
    time: null 
};

// ESP32 and Dashboard use this to get current orders
app.get("/control", (req, res) => {
    res.status(200).json(systemState);
});

// Dashboard uses this to send new orders
app.post("/control", (req, res) => {
    const { action, active } = req.body;
    if (action !== undefined && active !== undefined) {
        systemState = { action, active };
        console.log(`[CLOUD] Command Updated: ${action}`);
        res.json({ status: "success", current: systemState });
    } else {
        res.status(400).json({ error: "Invalid payload" });
    }
});

// ESP32 uses this to push DHT11 data
app.post("/sensors", (req, res) => {
    sensorLogs = { 
        temp: req.body.temp, 
        hum: req.body.hum, 
        time: new Date().toISOString() 
    };
    console.log(`[FARM] DHT11: ${sensorLogs.temp}C, ${sensorLogs.hum}%`);
    res.json({ status: "received" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Limika Cloud Engine Solid on port ${PORT}`));
