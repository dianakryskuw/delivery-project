var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var controllers = require('./controllers');
var path = require('path');
var mongoose = require("mongoose");
var url = "mongodb://diana_kryskuw:1@ds247078.mlab.com:47078/delivery";
var arrivalMail = require('./helpers/sendArrivalMail');

mongoose.connect(url)
const db = mongoose.connection

db.on('error', err => {
	console.log('error connection', err)
})

db.once('open', () => {
  console.log("Connected")
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static('client'));

app.get("/", (request, response) => {
  response.sendFile(path.resolve("client/", "index.html"));
});
app.get("/track", (request, response) => {
  response.sendFile(path.resolve("client/", "index.html"));
});
app.get("/add", (request, response) => {
  response.sendFile(path.resolve("client/", "index.html"));
});
controllers.set(app);

arrivalMail.startCron();

var port = process.env.PORT || 8800
module.exports.start = () => app.listen(port, () => console.log('App listening on port '+ port));
