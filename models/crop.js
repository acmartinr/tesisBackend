'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cropSchema = mongoose.Schema({
    cropID: String,
    cropName: String,
    maxTemperature:Int32Array,
    minTemperature:Int32Array,
    maxHumedity:Int32Array,
    minHumedity:Int32Array,
    luminosity:Int32Array,
    cropLatitude:Float32Array,
    cropLongitude:Float32Array,
    created_at: String,
});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017');
module.exports = mongoose.model('crop', cropSchema);