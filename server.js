const express = require('express');
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