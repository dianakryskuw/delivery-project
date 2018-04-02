var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var orderScheme = new Schema({
    departure_point: {
        lat: {
          type: Number,
          required: true
        },
        lng: {
          type: Number,
          required: true
        },
        address: String
    },
    arrival_point: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      },
      address: String
    },
    time: {
      text:  String,
      value: Number
    },
    distance: {
      text:  String,
      value: Number
    },
    price: Number,
    date:Date,
    arrivalDate: { type: Date, default: null },
    email: {
      type: String,
      required: true
    },
    status:{
      type: String,
      enum: ['in the store', 'on the way','delivered']},
    items: [
        {
            name: {
              type: String,
              required: true
            },
            weight: { type: Number, default: 1 },
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