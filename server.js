const express = require('express');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');
client.subscribe('/device/online',function(err){

});
client.subscribe('/device/offline',function(err){

});
client.on('conect',function(){
  console.log("client connected");
});
client.subscribe('v1/devices/me/attributes',function(err){

});

const session = require('express-session');
require("dotenv").config();

const app = express();
var bodyParser = require('body-parser');
const router = express.Router();
app.use(session({
  secret: 'ssshhhh'
}));
app.use(express.static('static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//console.log(process.env.USER); // => max
//console.log(process.env.HOST); // => localhost

require('./libs/api-rest-services')(router);
app.use('/', router);
const PORT = process.env.PORT || 4000;
var server = app.listen(PORT, function () {
  //var host = server.address().address="169.254.228.118";
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening on http://%s:%s...', host, port);
});
var io = require('socket.io')(server);
io.on('connection',function(socket){
console.log("new user connected");
socket.on('disconnect',function(){
console.log("user disonnected");
});
client.on('message',function(topic, message){
  console.log("Device Tipoc",topic);
  if(topic == "/device/online"){
    io.emit("deviceConnected",message.toString());
  }
  else if(topic == "/device/offline"){
    console.log("Message from broker",message.toString());
    io.emit("deviceDisconnected",message.toString());
  }
  else if(topic == "v1/devices/me/attributes"){
    io.emit("dataSend",message.toString());
  }
  
});
socket.on('send',function(data){
  console.log("Send data",data);

//  io.emit('deviceDisconeted',"0");
  });
  socket.on('connectedDevice',function(data){
    console.log("Device connected"+data);

    //io.emit('deviceConnected',"0");
    });
});
