const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema(
   { temperature : Number, humidity : Number, pressure : Number, time : String, date : String },
   { collection: 'device1' }
)

module.exports = mongoose.model('device1', SensorDataSchema);