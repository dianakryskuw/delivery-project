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
    app.post('/addorder', (request, response) => {
            var Order = mongoose.model("Order", mongooseSchema.orderScheme, "order");
            var newOrder = request.body.currentData;
            newOrder._id = new ObjectId();
            newOrder.price = Math.round(newOrder.distance.value / 5000);
            newOrder.date = new Date(Date.now());
            newOrder.status = "in the store";
            var my_order = new Order(newOrder);
            my_order.save().then((my_order, err)=> {
                if (err) {
                    response.send({success:false, message:'Incorrect data in request'});
                }
                    else {
            var mailHTML=text.sendAddedOrderMail(my_order._id)
                    mail.mailing(my_order.email,mailHTML)
                response.send({
                    success:true,
                    orderId: my_order._id,
                    orderArrivalDate: my_order.arrivalDate
                });
            }
            });
    });

    app.post('/api/orders', (request, response) => {
        var newOrder = request.body;
        const departurePoint={
            lat:51.03327,
            lng:32.42985
        }
        newOrder.departurePoint=departurePoint;
        var distanceParams = {
            "origins": departurePoint.lat + "," + departurePoint.lng,
            "destinations": request.body.arrivalPoint.lat + "," + request.body.arrivalPoint.lng
        };
        distance.distance(distanceParams).then(result => {
            newOrder.departurePoint.address = result.origin_addresses[0];
            newOrder.arrivalPoint.address = result.destination_addresses[0];
            newOrder.distance = result.rows[0].elements[0].distance;
            newOrder.time = result.rows[0].elements[0].duration;
            newOrder.price = Math.round(newOrder.distance.value / 5000);
            var Order = mongoose.model("Order", mongooseSchema.orderScheme, "order");
            newOrder._id =  new ObjectId();
            newOrder.date = new Date();
            newOrder.status = "in the store";
            var my_order = new Order(newOrder);
            my_order.save().then((my_order, err) => {
                if (err){
                    response.send({success:false, message:'Incorrect data in request'});
                } 
                else{

                    var mailHTML=text.sendAddedOrderMail(my_order._id)
                    mail.mailing(my_order.email,mailHTML)
            trackUrl = "https://delivery-service08.herokuapp.com/track/"
            response.send({
                success: true,
                trackId: newOrder._id,
                trackCode: trackUrl + newOrder._id
            });
                }
            });
        })
           
    });

    app.get('/track/:id', (req, res) => {
            var Order = mongoose.model("Order", mongooseSchema.orderScheme, "order");
                var oId = ObjectId(req.params.id);
                Order.findOne({ '_id': oId }).then((order, err) => {
                    if (err) return res.send(err);
                    else {
                        res.send(order);
                    }
                  });
    });


}