const express = require('express');
const router = express.Router();
const SensorData = require('../models/sensors_data');

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const newData = new SensorData(req.body);
        newData.save((err, data) => {
            if (err) {
                console.error(err);
                res.status(404).jsonp({ message: err })
            }
            console.debug("Data created succesfully", req.body);
            res.status(201).json({message: "Data created succesfully"});
        });
    }catch(err) {
        res.json({message: err});
    }
});

module.exports = router