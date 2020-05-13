'use strict';
const device = require('../../models/device');
exports.registerProduct = (deviceID, deviceName, deviceType) =>
    new Promise((resolve, reject) => {
        const newDevice = new device({
            deviceID: deviceID,
            deviceName: deviceName,
            deviceType: deviceType,
            created_at: new Date()
        });
        newDevice.save()
            .then(() => resolve({ status: 201, message: 'Device Registered Sucessfully !' }))
            .catch(err => {
                if (err.code == 11000) {
                    reject({ status: 409, message: 'Device Already Registered !' });
                } else {
                    reject({ status: 500, message: 'Internal Server Error !' });
                }
            });
    });