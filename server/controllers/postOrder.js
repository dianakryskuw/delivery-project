var GoogleMapsAPI = require('googlemaps');
var publicConfig = {
    key: 'AIzaSyAoT2e9ISl-I6CU8tBpxzo0MFAEpka8Wc4',
    stagger_time: 1000, // for elevationPath 
    encode_polylines: false,
    secure: true, // use https 
};
var gmAPI = new GoogleMapsAPI(publicConfig);

var geocode = (reverseGeocodeParams) => new Promise(function(resolve, reject) {
  textMail = {
            from: "dianakryskuw@ukr.net",
            recipients: ["diana.kryskuw@gmail.com"],
            message: "Subject: test\r\n\r\nHello world!"
        }
        mail.mailing();
        mongoose.connect(MONGO_URL);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
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
                if (err) return console.error(err);
            });
            response.send({
                orderId: my_order._id,
                orderArrivalDate: my_order.arrivalDate
            });
        });
});
module.exports = {
    geocode
}