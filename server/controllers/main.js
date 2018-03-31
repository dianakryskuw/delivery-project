var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId =require('mongodb').ObjectId;
var mongoose = require("mongoose");
var mongooseSchema = require('./schema');
var url = "mongodb://diana_kryskuw:1@ds247078.mlab.com:47078/delivery";
const MONGO_URL = 'mongodb://Anna2:Aa12345@ds247078.mlab.com:47078/delivery';
var mail = require('../helpers/sendMail');
var code = require('../helpers/geoCodeAddress');
var distance = require('../helpers/distance');

module.exports = (app) => {
  app.post('/addorder', function(request, response){
    textMail={
      from:"dianakryskuw@ukr.net",
      recipients: ["diana.kryskuw@gmail.com"],
      message: "Subject: test\r\n\r\nHello world!"
    }
    mail.mailing();
  mongoose.connect(MONGO_URL);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
  var Order = mongoose.model("Order",mongooseSchema.orderScheme,"order");
  var my_id=new ObjectId();
  var curr_date=new Date(Date.now());
  var arr_date=null;
  var newOrder=request.body.currentData;
  console.log(request.body);
  newOrder._id=my_id;
  newOrder.price=200;
  newOrder.date=curr_date;
  newOrder.arrivalDate=null;
  newOrder.status="in the store";
  var my_order=new Order(newOrder);
  my_order.save(function (err, my_order) {
    if (err) return console.error(err);
  });
  response.send({ 
    orderId:my_order._id,
    orderArrivalDate:my_order.arrivalDate
  });
  });
});

  app.post('/api/orders', function(request, response){
  var newOrder=request.body;  
  var distanceParams = {
    "origins": request.body.departure_point.lat+","+request.body.departure_point.lng,
    "destinations": request.body.arrival_point.lat+","+request.body.arrival_point.lng
  };
  distance.distance(distanceParams).then(result => {
    newOrder.departure_point.address=result.origin_addresses[0];
    newOrder.arrival_point.address=result.destination_addresses[0];
    newOrder.distance=result.rows[0].elements[0].distance; 
    newOrder.time=result.rows[0].elements[0].duration;
  })
  mongoose.connect(MONGO_URL);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
  var Order = mongoose.model("Order",mongooseSchema.orderScheme,"order");
  var my_id=new ObjectId();
  var curr_date=new Date(Date.now());
  var arr_date=null;
  newOrder._id=my_id;
  newOrder.date=curr_date;
  newOrder.price=Math.round(newOrder.distance.value/5000);
  newOrder.arrivalDate=null;
  newOrder.status="in the store";
  var my_order=new Order(newOrder);
  my_order.save(function (err, my_order) {
   if (err) return console.error(err);
  });
  trackUrl="http://localhost:8800/trackorder"
  response.send({
    success:true,
    trackId:newOrder._id,
    trackCode:trackUrl+newOrder._id,
    arrivalDate:newOrder.arrivalDate
  });
  });
});

  app.get('/trackorder', function(req, res) {
    var url = "mongodb://diana_kryskuw:1@ds247078.mlab.com:47078/delivery";
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("delivery");
    try{
      var oId=ObjectId(req.query.order);
    var trackingOrder=dbo.collection("order").find({"_id":oId}).toArray(function(err, result) {
    if (err) throw err;
    res.send(result[0]);
    db.close();
    });
    }
    catch(e){
        res.send(e);
    }
});
});


}
