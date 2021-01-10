const express = require('express');
const router = express.Router();


router.get('/temperature', (req, res) => {
    res.send('Temperature');
});

router.get('/pressure', (req, res) => {
    res.send('Pressure');
});

module.exports = router