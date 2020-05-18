'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cropSchema = mongoose.Schema({
    cropName: String,
    cropType:String,
    maxTemperature:String,
    minTemperature:String,
    maxHumedity:String,
    minHumedity:String,
    luminosity:String,
    cropLatitude:String,
    cropLongitude:String,
    created_at: String,
});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017');
module.exports = mongoose.model('crop', cropSchema);