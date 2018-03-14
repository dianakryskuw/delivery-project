var mongoose = require("mongoose");
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
    time: {
      text: String,
      value: Number
    },
    distance: {
      text: String,
      value: Number
    },
    price: Number,
    date:Date,
    arrivalDate: { type: Date, default: null },
    email: String,
    status:{
      type: String,
      enum: ['in the store', 'on the way','delivered']},
    items: [
        {
            name: String,
            weight: Number
        }
    ]
  })
  
  var carScheme = new Schema({
    status:{ type: Boolean, default: false },// true-car is busy, false-car is empty
    capacity:{ type: Number, default: 1 },
    order_id:{ type: String, default: null },
    finish_time:{ type: Date, default: null },
  })

  module.exports={orderScheme,carScheme}