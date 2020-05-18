'use strict';
const crop = require('../../models/crop');
exports.registerCrop = (cropName, cropType,maxTemperature,minTemperature,maxHumedity,minHumedity,luminosity,cropLatitude,cropLongitude) =>
    new Promise((resolve, reject) => {
        const newCrop = new crop({
            cropName: cropName,
            cropType:cropType,
            maxTemperature: maxTemperature,
            minTemperature:minTemperature,
            maxHumedity:maxHumedity,
            minHumedity:minHumedity,
            luminosity:luminosity,
            cropLatitude:cropLatitude,
            cropLongitude:cropLongitude,
            created_at: new Date()
        });
        newCrop.save()
            .then(() => resolve({ status: 201, message: 'Crop Registered Sucessfully !' }))
            .catch(err => {
                if (err.code == 11000) {
                    reject({ status: 409, message: 'Crop Already Registered !' });
                } else {
                    reject({ status: 500, message: 'Internal Server Error !' });
                }
            });
    });