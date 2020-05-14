'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = mongoose.Schema({
    userFirstName: String,
    userLastName: String,
    userAge: String,
    userEmail: String,
    userGender: String,
    userPassword: String,
    userImg: String,
    created_at: String,
});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017');
module.exports = mongoose.model('users', userSchema);