var text = require('../constants/mailText');
var ObjectId = require('mongodb').ObjectId;
var Order = require('../models/order');
var mail = require('../helpers/sendMail');
var distance = require('../helpers/distance');


function initialOrder(orderData) {
    orderData._id = new ObjectId();
    orderData.price = calculatePrice(orderData.distance.value, +orderData.items[0].weight || 1)
    return orderData;
}

function calculatePrice(distance, weight) {
    var fixedPrice = 20;
    if (distance <= 0 || weight <= 0) {
        return fixedPrice;
    }
    return fixedPrice + Math.round((distance / 10000) * weight);
}

var addNewOrder = (request, response) => {
    var newOrder = new Order(initialOrder(request.body.currentData));
    newOrder.save()
    .then((order, error) => {
        if (error) {
            response.send({
                success: false,
                message: 'Incorrect data in request'
            });
        } else {
            var mailHTML = text.sendAddedOrderMail(order._id)
            mailing(order.email, mailHTML)
            response.send({
                success: true,
                order: order
            });
        }
    })
    .catch(e=>{
        response.send({
            success: false,
            message: 'Incorrect data in request'
        });
    });
}

var addNewOrderFromStore = (request, response) => {
    const departurePoint = {
        lat: 49.843546,
        lng: 24.013581
    }
    var newOrder = request.body;
    newOrder.departurePoint = departurePoint;
    var distanceParams = {
        "origins": newOrder.departurePoint.lat + "," + newOrder.departurePoint.lng,
        "destinations": newOrder.arrivalPoint.lat + "," + newOrder.arrivalPoint.lng
    };
    distance(distanceParams)
    .then(result => {
        newOrder.departurePoint.address = result.origin_addresses[0];
        newOrder.arrivalPoint.address = result.destination_addresses[0];
        newOrder.distance = result.rows[0].elements[0].distance;
        newOrder.time = result.rows[0].elements[0].duration;
        var my_order = new Order(initialOrder(newOrder));
        my_order.save().then((order, error) => {
            if (error) {
                response.send({
                    success: false,
                    message: 'Incorrect data in request'
                });
            } else {
                var mailHTML = text.sendAddedOrderMail(order._id)
                mailing(order.email, mailHTML)
                trackUrl = "https://delivery-service08.herokuapp.com/track/"
                response.send({
                    success: true,
                    trackId: order._id,
                    trackCode: trackUrl + order._id
                });
            }
        })
        .catch(e=>{
            response.send({
                success: false,
                message: 'Incorrect data in request'
            });
        });
    })

}

var trackOrder = (request, response) => {
    Order.findOne({
        '_id': request.params.id
    })
    .then((order, error) => {
        if (order) {
            response.send({
                success: true,
                order: order
            });
        }
        else {
            response.send({
                success: false,
                message: "Invalid track code"
            });
        }
    })
    .catch(e =>{
        response.send({
            success: false,
            message: "Invalid track code"
        })
    })   
}

module.exports = {
    addNewOrder,
    addNewOrderFromStore,
    trackOrder,
    calculatePrice
}