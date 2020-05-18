var mosca = require('mosca');
var settings = {
		port:1883
		}

var server = new mosca.Server(settings);

server.on('ready', function(){
console.log("ready");

});
server.on("clientConnected", function(client) {
	console.log("Client connected"+client.id);

		var message = {
			topic: '/device/online',
			payload: client.id,
			qos:0,
			retain:false
		};
		server.publish(message,function(){
			console.log("doneSPublish");
		});
});

server.on('subscribed', function (topic, client) {
	console.log("response.topic:" + topic);
	console.log("response.client:" + client.id);
	

});
server.subscribe("v1/devices/me/attributes", function (topic, playload) {
	console.log("response.topic:" + topic);
	console.log("response.playload:" + playload.toString());
	var message = {
		topic: '/hello/world',
		payload: 'abcde',
		qos:0,
		retain:false
	};
	server.publish(message,function(){
		console.log("done");
	});
});
server.on("clientDisconnected", function(client) {
	console.log("Client Disconnected:" + client.id);
	var message = {
		topic: '/device/offline',
		payload: client.id,
		qos:0,
		retain:false
	};
	server.publish(message,function(){
		console.log("doneSPublish");
	});
});