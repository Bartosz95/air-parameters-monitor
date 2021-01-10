const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const BASE_URL = '/api/v1';

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json());

app.get(BASE_URL, (req, res, next) => {
    res.send({'title': 'Hello world'});
});

app.listen(PORT, console.log(`Running on http://localhost:${PORT}${BASE_URL}`));