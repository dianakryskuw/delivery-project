var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var orderScheme = new Schema({
    departurePoint: {
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
    arrivalPoint: {
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
    date: { type: Date, default: new Date()},
    arrivalDate: { type: Date, default: null },
    email: {
      type: String,
      required: true
    },
    status:{
      type: String,
      enum: ['in the store', 'on the way','delivered'],
      default:'in the store'
    },
    items: [
        {
            name: {
              type: String,
              required: true
            },
            weight: { type: Number, default: 1 },
        }
    ],
    emailSent:{type:Boolean,default:false   }
  })
  
  var Order = mongoose.model("Order", orderScheme, "order");

  module.exports = Order