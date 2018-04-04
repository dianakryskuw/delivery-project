var text = require('../constants/mailText');

var ObjectId = require('mongodb').ObjectId;
var mongoose = require("mongoose");
var mongooseSchema = require('./schema');
var url = "mongodb://diana_kryskuw:1@ds247078.mlab.com:47078/delivery";
const MONGO_URL = 'mongodb://Anna2:Aa12345@ds247078.mlab.com:47078/delivery';
var mail = require('../helpers/sendMail');
var code = require('../helpers/geoCodeAddress');
var distance = require('../helpers/distance');

module.exports = (app) => {
    app.post('/addorder', function(request, response) {
            var Order = mongoose.model("Order", mongooseSchema.orderScheme, "order");
            var my_id = new ObjectId();
            var curr_date = new Date(Date.now());
            var arr_date = null;
            var newOrder = request.body.currentData;
            newOrder._id = my_id;
            newOrder.price = 200;
            newOrder.date = curr_date;
            newOrder.arrivalDate = null;
            newOrder.status = "in the store";
            var my_order = new Order(newOrder);
            my_order.save(function(err, my_order) {
                if (err) return response.send({success:false});
                    else {
            var userMail=my_order.email;
            var mailHTML=text.sendAddedOrderMail(my_order._id)
                    mail.mailing(userMail,mailHTML)
                response.send({
                    orderId: my_order._id,
                    orderArrivalDate: my_order.arrivalDate
                });
            }
            });
    });

    app.post('/api/orders', function(request, response) {
        var newOrder = request.body;
        const departure_point={
            lat:51.03327,
            lng:32.42985
        }
        newOrder.departure_point=departure_point;
        var distanceParams = {
            "origins": departure_point.lat + "," + departure_point.lng,
            "destinations": request.body.arrival_point.lat + "," + request.body.arrival_point.lng
        };
        distance.distance(distanceParams).then(result => {
            newOrder.departure_point.address = result.origin_addresses[0];
            newOrder.arrival_point.address = result.destination_addresses[0];
            newOrder.distance = result.rows[0].elements[0].distance;
            newOrder.time = result.rows[0].elements[0].duration;
            newOrder.price = Math.round(newOrder.distance.value / 5000);
        })
        
            var Order = mongoose.model("Order", mongooseSchema.orderScheme, "order");
            var my_id = new ObjectId();
            var curr_date = new Date(Date.now());
            var arr_date = null;
            newOrder._id = my_id;
            newOrder.date = curr_date;
            //newOrder.price = Math.round(newOrder.distance.value / 5000);
            newOrder.arrivalDate = null;
            newOrder.status = "in the store";
            var my_order = new Order(newOrder);
            my_order.save(function(err, my_order) {
                if (err){
                    response.send({success:false, message:'Incorrect data in request'});
                    return console.error(err);
                } 
                else{

            trackUrl = "https://delivery-service08.herokuapp.com/track/"
            response.send({
                success: true,
                trackId: newOrder._id,
                trackCode: trackUrl + newOrder._id,
                arrivalDate: newOrder.arrivalDate
            });
                }
            });
    });

    app.get('/track/:id', function(req, res) {
            var Order = mongoose.model("Order", mongooseSchema.orderScheme, "order");
                var oId = ObjectId(req.params.id);
                Order.findOne({ '_id': oId }, function (err, order) {
                    if (err) return res.send(err);
                    else res.send(order);
                  });
    });


}