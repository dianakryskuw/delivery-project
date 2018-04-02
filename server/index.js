var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var controllers = require('./controllers');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static('client'));

app.get("/track", (request, response) => {
  response.sendFile(path.resolve("client/", "index.html"));
});
app.get("/add", (request, response) => {
  response.sendFile(path.resolve("client/", "index.html"));
});
controllers.set(app);
module.exports.start = () => app.listen(config.port, () => console.log('App listening on port '+ config.port));
