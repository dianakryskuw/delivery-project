var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var controllers = require('./controllers');
var path = require('path');
var mail = require('./helpers/sendMail');
var mongoose = require("mongoose");
var mongooseSchema = require('./controllers/schema');
var url = "mongodb://diana_kryskuw:1@ds247078.mlab.com:47078/delivery";
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

app.get("*", (request, response) => {
  response.sendFile(path.resolve("client/", "index.html"));
});
app.get("/track", (request, response) => {
  response.sendFile(path.resolve("client/", "index.html"));
});
app.get("/add", (request, response) => {
  response.sendFile(path.resolve("client/", "index.html"));
});
controllers.set(app);
var cron = require('node-cron');
 
cron.schedule('*/1 * * * *', function(){
      var Order = mongoose.model("Order", mongooseSchema.orderScheme, "order");
          var currentDate = new Date(Date.now());
          Order.find({ 'arrivalDate': {$lt:currentDate}, 'emailSent':false}, function (err, orders) {
              if (err) return handleError(err);
              orders.forEach(order => {
                console.log(order)
                mail.mailing("diana.kryskuw@gmail.com");
              });
            });
            Order.update({'arrivalDate': {$lt:currentDate}, 'emailSent':false}, { $set: { emailSent: true }},
            {
              multi: true
            }, function(err) {
              if (err) return res.send(err);
            });
  console.log('running a task every minute');
});
var port = process.env.PORT || 8800
module.exports.start = () => app.listen(port, () => console.log('App listening on port '+ port));
