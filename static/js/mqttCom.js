
var socket = io();
console.log("all OK");

var buttonOnLed = document.getElementById("onLed");
var tmpValue = document.getElementById("tmpValue");
var deviceId = document.getElementById("deviceId");
var topicValue=document.getElementById("topicValue");
function onLed() {
    socket.emit('led', "on",topicValue.value);
}

function offLed() {
    socket.emit('led', "off",topicValue.value);
}
socket.on('sensors', function (value) {
    var str = value;
    var obj = JSON.parse(str);
    tmpValue.textContent=obj.values.temp;
    deviceId.textContent=obj.devices;
    console.log(value);
});
