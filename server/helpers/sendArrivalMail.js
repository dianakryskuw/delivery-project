var cron = require('node-cron');
var mail = require('./sendMail');
var mongoose = require("mongoose");
var mongooseSchema = require('../controllers/schema');
var text = require('../constants/mailText');

var startCron = ()=> cron.schedule('*/5 * * * *', function(){
      var Order = mongoose.model("Order", mongooseSchema.orderScheme, "order");
          var currentDate = new Date(Date.now());
          Order.find({ 'arrivalDate': {$lt:currentDate}, 'emailSent':false}, function (err, orders) {
              if (err) return handleError(err);
              else{
              orders.forEach(order => {
                var mailHTML=text.sendArrivedOrderMail(order._id);
                mail.mailing(order.email,mailHTML);
              });
            }
            });
            Order.update({'arrivalDate': {$lt:currentDate}, 'emailSent':false}, { $set: { emailSent: true }},
            {
              multi: true
            }, function(err) {
              if (err) return res.send(err);
            });
  console.log('chackind order status 5 minute');
});

module.exports = {startCron}