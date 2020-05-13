'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const devicechema = mongoose.Schema({
    deviceID: String,
    deviceName: String,
    deviceType: String,
    created_at: String,
});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017');
module.exports = mongoose.model('device', devicechema);