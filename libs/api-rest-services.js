const registerDevice = require('../function/databaseManager/registerDevice');
const registerOrganoponic = require('../function/databaseManager/registerOrganoponic');
const superagent = require('superagent');
const Device = require('../models/device');
const Organoponic = require('../models/organoponic');
const User = require('../models/user');

var ObjectId = require('mongodb').ObjectId;
module.exports = (router) => {
    router.get('/', function (req, res) {
        sess = req.session;
        if (sess.email) {
            res.render('crops',{userName:req.session.email});
        } else {
            res.redirect("authenticate");
        }

    });

    router.get('/authenticate', (req, res) => {
        res.render('login',{err_code : ''});
    });
   

    router.get('/logOut', function (req, res) {
        req.session.email = "";
        res.redirect("authenticate");
    });

    router.post('/login', function (req, res) {
        session = req.session;
      //  console.log("Email",req.body.user.email);
        const userEmail = req.body.user.email;
        const userPassWord = req.body.user.password;
        User.find({ userEmail: userEmail }, function (err, data) {
           // res.render('userEmail', { data: data });
           if (data.length == 0){
            res.render('login',{ err_code: 'err_000' });
           }
           else if(data[0].userPassword != userPassWord){
               console.log("password",userPassWord)
            res.render('login',{ err_code: 'err_001' });
           }
           else if (data[0].userPassword == userPassWord){
            session.email = userEmail;
            res.redirect('/');
           }

        });
    });
    router.get("/home", function (req, res) {
        res.render("index", { tmp: 31 });
    });
    router.get("/devices/newDevice", function (req, res) {
        res.render("addDevice");
    });
    router.get("/addCrop", function (req, res) {
        res.render("addCrop");
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

    router.post('/registerNewOrganoponic', function (req, res) {
        var organoponicID = req.body.organoponic.id;
        const organoponicName = req.body.organoponic.name;



        //const organoponicLocation = req.body.organoponic.id;
        let json = {
            "username": "albertocarlosmartin@gmail.com",
            "password": "Martin18*"
        }
        var req = superagent
            .post('http://localhost:9090/api/auth/login')
            .send(json) // sends a JSON post body
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Accept', 'application/json')
            .then(res => {
                return res.body.token;
            }, err => {
                if (err.timeout) {
                    console.log("TimeOUT")
                    return 0;
                }
                else {
                    console.log("Other Error")
                    return 1;
                }
            });
        var req2 = req.then(resTb => {
            let asset = {
                "name": organoponicName,
                "type": "Organoponico",
                "additionalInfo": "Organoponico ubicado en la provincia plaza",
            }
            superagent
                .post('http://localhost:9090/api/asset')
                .send(asset) // sends a JSON post body
                .set('Content-Type', 'application/json; charset=utf-8')
                .set('X-Authorization', 'Bearer ' + resTb)
                .end((err, res1) => {
                    //console.log(res);

                    if (res1.status == 200) {
                        //Register Organoponic in database
                        registerOrganoponic.registerOrganoponic(organoponicID, organoponicName, "Lat-21.23;Long-39.09")
                            .then(result => {
                                res.setHeader('Location', '/organoponic/' + organoponicName);
                                console.log("organoponic created");

                                //     res.status(200).send(newscooter).json();
                                // res.status(result.status).json({ message: result })
                                //    res.status(200).send(result)
                            })
                            //.catch(err => res.status(err.status).json({ message: err.message }));
                            .catch(err => res.status(409).json({ message: err.message }));

                    }
                    console.log(res1.text);
                    res.redirect('/home');



                    //   console.log(res);
                });

        });


    })

    router.post('/registerNewDevice', function (req, res) {
        var deviceID = req.body.device.id;
        const deviceName = req.body.device.name;
        const deviceType = req.body.device.type;
        var asset = req.body.device.asset;

        let json = {
            "username": "albertocarlosmartin@gmail.com",
            "password": "Martin18*"
        }

        var req = superagent
            .post('http://localhost:9090/api/auth/login')
            .send(json) // sends a JSON post body
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Accept', 'application/json')
            .then(res => {
                return res.body.token;
            }, err => {
                if (err.timeout) {
                    console.log("TimeOUT")
                    return 0;
                }
                else {
                    console.log("Other Error")
                    return 1;
                }
            });
        var req2 = req.then(resTb => {
            let device = {
                "name": deviceName,
                "type": deviceType,
                "label": "Simples"
            }
            superagent
                .post('http://localhost:9090/api/device')
                .send(device) // sends a JSON post body
                .set('Content-Type', 'application/json; charset=utf-8')
                .set('X-Authorization', 'Bearer ' + resTb)
                .end((err, res1) => {
                    //console.log(res);
                    console.log(res1.text);
                    res.redirect('/home');
                    //   console.log(res);
                });

        });

    });
    
    router.post('/registerNewCrop', function (req, res) {
        console.log("New Crop created")
        
        var cropID = req.body.crop.id;
        const cropName = req.body.crop.name;
        const cropType = req.body.crop.type;
        const cropLatitude = req.body.crop.latitude;
        const cropLongitude = req.body.crop.longitude;
        const cropMaxTemp = req.body.crop.maxTemp;
        const cropMinTemp = req.body.crop.minTemp;
        const cropMinHum = req.body.crop.minHum;
        const cropMaxHum = req.body.crop.maxHum;
        const cropLum = req.body.crop.lum;

        let json = {
            "username": "albertocarlosmartin@gmail.com",
            "password": "Martin18*"
        }

        var req = superagent
            .post('http://localhost:9090/api/auth/login')
            .send(json) // sends a JSON post body
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Accept', 'application/json')
            .then(res => {
                return res.body.token;
            }, err => {
                if (err.timeout) {
                    console.log("TimeOUT")
                    return 0;
                }
                else {
                    console.log("Other Error")
                    return 1;
                }
            });
        var req2 = req.then(resTb => {
            let device = {
                "name": cropName,
                "type": cropType,
                "latitude": cropLatitude,
                "longitude": cropLongitude,
                "maxTemp": cropMaxTemp,
                "minTemp": cropMinTemp,
                "maxHum": cropMaxHum,
                "minHum": cropMinHum,
                "lum": cropLum,
                "idSerial":cropID
            }
            superagent
                .post('http://localhost:9090/api/asset')
                .send(device) // sends a JSON post body
                .set('Content-Type', 'application/json; charset=utf-8')
                .set('X-Authorization', 'Bearer ' + resTb)
                .end((err, res1) => {
                    //console.log(res);
                    console.log(res1.text);
                    res.redirect('/home');
                    //   console.log(res);
                });

        });

    });
    router.get('/devicelist', function (req, res) {
        var findKey = {};
        Device.find(findKey, function (err, data) {
            //    console.log(data);
            res.render('devicelist', { data: data });
        });
    });
    router.get('/crops', function (req, res) {

        sess = req.session;
        if (sess.email) {
            res.render('crops',{userName:req.session.email});
        } else {
            res.redirect("authenticate");
        }
                
    });

    router.get('/device', function (req, res) {
        let id = req.query['edit'];
        Device.find({ deviceID: id }, function (err, data) {
            //    console.log(data);
            console.log("you has edited the element " + data);
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
    router.get('/addNewDevice', function (req, res) {
        res.render('addNewDevice');
    });
    router.get('/addNewCrop', function (req, res) {
        res.render('addCrop');
    });
    router.get('/addOrganoponic', function (req, res) {
        res.render('addOrganoponic');
    });
    router.get('/organoponicDetail', function (req, res) {
        res.render('organoponicDetail');
    });
    
}