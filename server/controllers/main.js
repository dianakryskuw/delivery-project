var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId =require('mongodb').ObjectId;
var mongoose = require("mongoose");
module.exports = (app) => {
  app.post('/addorder', function(request, response){
    var url = "mongodb://diana_kryskuw:1@ds247078.mlab.com:47078/delivery";
    const MONGO_URL = 'mongodb://Anna2:Aa12345@ds247078.mlab.com:47078/delivery';

MongoClient.connect(url, function(err, db) {
  var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var orderScheme = new Schema({
  departure_point: {
      lat: Number,
      lng: Number,
      address: String
  },
  arrival_point: {
    lat: Number,
    lng: Number,
    address: String
  },
  time: Number,
  distance: Number,
  price: Number,
  date:Date,
  arrivalDate: Date,
  email: String,
  status:String,
  items: [
      {
          name: String,
          weight: Number
      }
  ]
})

var carScheme = new Schema({
  status:{ type: Boolean, default: false },
  capacity:{ type: Number, default: 1 },
  order_id:{ type: String, default: null },
  finish_time:{ type: Date, default: null}

})
  if (err) throw err;
  var dbo = db.db("delivery");
  var my_id=new ObjectId();
  var curr_date=new Date(Date.now());
  var arr_date=new Date(Date.now());
  dbo.collection("order").insert(
    {
      "_id":my_id,
      "departure_point":
      {
        "lat":request.body.from_lat,
        "lng":request.body.from_lng,
        "address":request.body.from_adr
      },
      "arrival_point":
      {
        "lat":request.body.to_lat,
        "lng":request.body.to_lng,
        "address":request.body.to_adr
      },
      "time": {
        "text":request.body.duration,
        "value":request.body.duration_v
      },
      "distance":
      {
        "text":request.body.distance,
        "value":request.body.distance_v
      },
      "price":200,
      "date":curr_date,
      "arrivalDate":null,
      "email":request.body.email,
      "status":"in the store",
      "items":
      [
        {"name":request.body.item_name, "weight":request.body.item_weight}
      ]
    }
  )
  response.send("Your track code is: " + my_id+"   and your order will arrive   "+arr_date);
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
