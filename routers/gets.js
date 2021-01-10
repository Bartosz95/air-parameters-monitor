const express = require('express');
const router = express.Router();
const SensorDataSchema = require('../models/sensors_data');

router.get('/', async (req, res) => {
    try {
        const sensorData = await SensorDataSchema.find();
        res.json(sensorData);
    }catch(err) {
        res.json({message:err});
    }
});

router.get('/temperature', (req, res) => {
    res.send('Temperature');
});

router.get('/pressure', (req, res) => {
    res.send('Pressure');
});

module.exports = router
