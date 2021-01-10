const express = require('express');
const router = express.Router();
const SensorData = require('../models/sensors_data');

router.get('/', async (req, res) => {
    try {
        const sensorData = await SensorData.find({},{_id:0, date:1, time:1, temperature:1, pressure:1, humidity:1},{limit:30, sort: { time: -1 } },function (err, data) {
            if (err) return console.error(err);
            res.json(data); 
        });
    }catch(err) {
        res.json({message:err});
    }
});

router.get('/temperature', async (req, res) => {
    try {
        const sensorData = await SensorData.find({},{_id:0, time:1, temperature:1,}, {limit:30, sort: { time: -1 } }, function (err, data) {
            if (err) return console.error(err);
            res.json(data);
        }).exec();
    }catch(err) {
        res.json({message:err});
    }
});

router.get('/pressure', async (req, res) => {
    try {
        const sensorData = await SensorData.find({},{_id:0, time:1, pressure:1,}, {limit:30, sort: { time: -1 } }, function (err, data) {
            if (err) return console.error(err);
            res.json(data);
        }).exec();
    }catch(err) {
        res.json({message:err});
    }
});


router.get('/humidity', async (req, res) => {
    try {
        const sensorData = await SensorData.find({},{_id:0, time:1, humidity:1,}, {limit:30, sort: { time: -1 } }, function (err, data) {
            if (err) return console.error(err);
            res.json(data);
        }).exec();
    }catch(err) {
        res.json({message:err});
    }
});

module.exports = router
