'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const organoponicSchema = mongoose.Schema({
    organoponicID: String,
    organoponicName: String,
    organoponicLocation: String,
});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017');
module.exports = mongoose.model('organoponic', organoponicSchema);