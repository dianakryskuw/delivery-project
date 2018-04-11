var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var controllers = require('./controllers');
var path = require('path');
var mongoose = require("mongoose");
var url = "mongodb://diana_kryskuw:1@ds247078.mlab.com:47078/delivery";
var sendArrivalMail = require('./helpers/sendArrivalMail');

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
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get("/track/:id", (request, response) => {
  response.sendFile(path.resolve("client/", "index.html"));
});
app.get("/track", (request, response) => {
  response.sendFile(path.resolve("client/", "index.html"));
});
app.get("/", (request, response) => {
  response.sendFile(path.resolve("client/", "index.html"));
});
app.get("/add", (request, response) => {
  response.sendFile(path.resolve("client/", "index.html"));
});

controllers.set(app);

sendArrivalMail();

var port = process.env.PORT || 8800
module.exports.start = () => app.listen(port, () => console.log('App listening on port '+ port));
