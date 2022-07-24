const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');
const gets = require('./routers/gets');
const posts = require('./routers/posts');


const {
  APP_HOSTNAME,
  APP_PORT,
  APP_PATH,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DBNAME
} = process.env;

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
  useNewUrlParser: true, 
  useUnifiedTopology: true
};

const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin`;
mongoose.connect(MONGO_URL, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {});

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json());

app.use(APP_PATH, gets);
app.use(APP_PATH, posts);

app.listen(APP_HOSTNAME, APP_PORT, () => console.log(`Running on http://${APP_HOSTNAME}:${APP_PORT}${APP_PATH}`));