const registerDevice = require('../function/databaseManager/registerDevice');
const Device = require('../models/device');
var ObjectId = require('mongodb').ObjectId;
module.exports = (router) => {
    router.get("/", function (req, res) {
        res.render("index", { tmp: 31 });
    });
    router.get("/devices/newDevice", function (req, res) {
        res.render("addDevice");
    });

    router.post('/registerDevice', function (req, res) {
        var deviceID = req.body.device.id;
        const deviceName = req.body.device.name;
        const deviceType = req.body.device.type;

        registerDevice.registerProduct(deviceID, deviceName, deviceType)
            .then(result => {
                res.setHeader('Location', '/device/' + deviceName);
                console.log("user created");
                res.redirect('/');
                //     res.status(200).send(newscooter).json();
                // res.status(result.status).json({ message: result })
                //    res.status(200).send(result)
            })
            //.catch(err => res.status(err.status).json({ message: err.message }));
            .catch(err => res.status(409).json({ message: err.message }));
    });
    router.get('/devicelist', function (req, res) {
        var findKey = {};
        Device.find(findKey, function (err, data) {
            //    console.log(data);
            res.render('devicelist', { data: data });
        });
    });
    router.get('/device', function (req, res) {
        let id = req.query['edit'];
        Device.find({deviceID : id}, function (err, data) {
            //    console.log(data);
            console.log("you has edited the element "+ data);
            res.render('device', { data: data });
        });
        /*var keys = Object.keys(req.query);
        console.log(req.query);
        //      console.log( keys[0]);
        if (keys[0] == "delete") {
            console.log("you has deleted the element");
        } else {
            console.log("you has edited the element");
        }
        var findKey = {
            "deviceID": keys[0],
          };
        Device.find({deviceID : keys[0]}, function (err, data) {
            //    console.log(data);
            console.log("you has edited the element "+ data);
            res.render('device', { data: data });
        });*/
    });
}