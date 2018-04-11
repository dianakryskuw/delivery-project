var cron = require('node-cron');
var mailing = require('./sendMail');
var text = require('../constants/mailText');
var Promise = require('bluebird');
var Order = require('../models/order');

function findOrders() {
    Order.find({
        'status': 'delivered',
        'emailSent': false
    })
    .then((orders, err) => {
        if (!err) {
            orders.forEach(order => {
                var mailHTML = text.sendArrivedOrderMail(order._id);
                mailing(order.email, mailHTML);
                order.set({
                    emailSent: true
                });
                order.save();
            });
        }
    });
    console.log('checking order status every minute');
}

var startCron = () => cron.schedule('*/1 * * * *', findOrders);

module.exports = startCron