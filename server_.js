var mqtt = require('mqtt');
const express = require('express');
const app = express();
/*
var bodyParser = require('body-parser');
app.use(express.static('static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('public', __dirname + '/public');
app.use(bodyParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
*/
var client = mqtt.connect('mqtt://127.0.0.1', {
    username: "3wSizw75ZNEYfmF4mRW7"
});


client.on('connect', function () {
    console.log('connected')
    client.subscribe('v1/devices/me/attributes', function (error) {
        if (!error) {
            client.publish('v1/devices/me/attributes', '{"temp":"31","hum":"60"}')
        }
    })

});

/*

client.on('connect', function () {
    console.log('connected')
    client.subscribe('v1/devices/me/attributes/response/+')
    client.publish('v1/devices/me/attributes/request/1', '{"clientKeys":"temp,hum"}')
});
*/
client.on('message', function (topic, message) {
    console.log("response.topic:" + topic);
    console.log("response.body:" + message.toString());
    client.end();
});


/*
var clientSub = mqtt.connect('mqtt://127.0.0.1');
const PORT = process.env.PORT || 3000

var server = app.listen(PORT, function () {
    //var host = server.address().address="169.254.228.118";
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening on http://%s:%s...', host, port);
});

app.get("/devices/newDevice", function (req, res) {
    res.render("addDevice");
});
app.get("/mqtt_service/onLed", function (req, res) {
    console.log("Led ON");
    res.end();
});
app.get("/mqtt_service/offLed", function (req, res) {
    console.log("Led OFF");
    res.end();
});
app.get("/", function (req, res) {
    res.render("index", { tmp: 31 });
});

var io = require('socket.io')(server);
io.on('connection', function (socket) {
  console.log('New user connected');
  socket.on('disconnect', function () {
    console.log('User disconnected');
  });
  socket.on('led', function (data,topic) {
      if(data==="on"){
        console.log("ON LED");
        console.log("Topc: "+topic);

            client.publish(topic, 'on');

      }
      else if(data==="off"){
        console.log("OFF LED");

            client.publish(topic, 'off');
            console.log("Topc: "+ topic);
      }

    //io.emit('chat', data, user);
  });
});

clientSub.on('connect', function () {
    clientSub.subscribe('arduino_1/sensor/temperature_celsius')
})
clientSub.on('message', function (topic, message) {
    context = message.toString();
    io.emit('sensors', context);
    console.log(context)
})
*/
/*
client.on('connect', function () {
    setInterval(function () {
        client.publish('myTopic', 'Hello mqtt');
        console.log('Message Sent');
    }, 5000);
});
*/