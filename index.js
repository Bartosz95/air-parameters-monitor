const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');
const gets = require('./routers/gets');
const SensorData = require('./models/sensors_data');
const split_data = require('./mechanics/split_data')

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || '/api/v1';
const DB_CONNECTION = process.env.DB_CONNECTION;

mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {});

SensorData.find(function (err, data) {
    if (err) return console.error(err);
    console.log(data[1]); // get data 
});

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json());

app.use(BASE_URL, gets);

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}${BASE_URL}`));