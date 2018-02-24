var mongo = require('mongodb');
module.exports = (app) => {
  app.post('/', function(request, response){
    console.log(request.body.from);
//});
	//app.get('/deliveries', (req, res) => {
    //here some db call
    var MongoClient = require('mongodb').MongoClient;
    var ObjectId =require('mongodb').ObjectId;
    var url = "mongodb://diana_kryskuw:1@ds247078.mlab.com:47078/delivery";

    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    }
    
    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("delivery");
  var my_id=new ObjectId();
  var curr_date=Date();
  var arr_date=Date();
  var dist = getDistanceFromLatLonInKm(request.body.from_lat,request.body.from_lng,request.body.to_lat,request.body.to_lng);
  dbo.collection("order").insert(
    {
      "_id":my_id,
      "departure_point":
      {
        "lat":request.body.from_lat,
        "lng":request.body.from_lng,
        "address":"address"
      },
      "arrival_point":
      {
        "lat":request.body.to_lat,
        "lng":request.body.to_lng,
        "address":"address"
      },
      "time":100,
      "distance":dist,
      "price":200,
      "date":curr_date,
      "arrivalDate":curr_date,
      "email":request.body.email,
      "status":"init",
      "items":
      [
        {"name":request.body.item_name, "weight":request.body.item_weight}
      ]
    }
  )
  response.send("Your track code is: " + my_id+"   and your order will arrive"+arr_date);
});
	});
}
