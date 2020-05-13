'use strict';
const organoponic = require('../../models/organoponic');
exports.registerOrganoponic = (organoponicID, organoponicName, organoponicLocation) =>
    new Promise((resolve, reject) => {
        const newOrganoponic = new organoponic({
            organoponicID: organoponicID,
            organoponicName: organoponicName,
            organoponicLocation: organoponicLocation,
            created_at: new Date()
        });
        newOrganoponic.save()
            .then(() => resolve({ status: 201, message: 'Organoponic Registered Sucessfully !' }))
            .catch(err => {
                if (err.code == 11000) {
                    reject({ status: 409, message: 'Organoponic Already Registered !' });
                } else {
                    reject({ status: 500, message: 'Internal Server Error !' });
                }
            });
    });