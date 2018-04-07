var cron = require('node-cron');
var mail = require('./sendMail');
var mongoose = require("mongoose");
var mongooseSchema = require('../controllers/schema');
var text = require('../constants/mailText');
var Promise = require('bluebird');
var schedule = Promise.promisify(require('node-cron').schedule);
var Order = mongoose.model("Order", mongooseSchema.orderScheme, "order");
var currentDate=new Date();

function findOrders(){
        Order.find({ 'arrivalDate': {$lt:currentDate}, 'emailSent':false}).then((orders, err) => {
          if (!err) {
            orders.forEach(order => {
              var mailHTML=text.sendArrivedOrderMail(order._id);
              mail.mailing(order.email,mailHTML);
              order.set({ emailSent: true });
              order.save(function (err, updatedOrder) {
                if (err) console.log(err);
                else console.log(updatedOrder);
              });
            });
          }
          });
  console.log('checking order status 5 minute');
}

var startCron = new Promise(()=>{
     cron.schedule('*/5 * * * *', findOrders)
});

module.exports = {startCron}