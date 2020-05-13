var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://127.0.0.1')
client.on('connect', function () {
    client.subscribe('arduino_1/sensor/temperature_celsius')
})
client.on('message', function (topic, message) {
    context = message.toString();
    console.log(context)
})