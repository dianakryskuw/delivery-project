var mongoose = require('mongoose');

var orderSchema = new Schema({
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
    time:{
        text: String,
        value: Number
    },
    distance: {
        text: String,
        value: Number
    },
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

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
