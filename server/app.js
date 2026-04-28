require('dotenv').config();

const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();

const connectDb = require("./scr/config/db");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],

}));

connectDb();


app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'PigeonShip API is running',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        documentation: '/api-docs'
    });
});


app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});


app.use("/api/v1/auth", require("./scr/routes/auth"));
app.use("/api/v1/contact", require("./scr/routes/contact"));
app.use("/api/v1/agent", require("./scr/routes/agent"));
app.use("/api/v1/campaign", require("./scr/routes/campaign"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
