var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId =require('mongodb').ObjectId;
var mongoose = require("mongoose");
var mongooseSchema = require('./schema');
var url = "mongodb://diana_kryskuw:1@ds247078.mlab.com:47078/delivery";
const MONGO_URL = 'mongodb://Anna2:Aa12345@ds247078.mlab.com:47078/delivery';

module.exports = (app) => {
  app.post('/addorder', function(request, response){
  mongoose.connect(MONGO_URL);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
  var Order = mongoose.model("Order",mongooseSchema.orderScheme,"order");
  var my_id=new ObjectId();
  var curr_date=new Date(Date.now());
  var arr_date=null;
  var newOrder=request.body.currentData;
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
