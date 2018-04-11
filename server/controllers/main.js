var orderController = require('./orderController')

module.exports = (app) => {
    
    app.post('/addorder', orderController.addNewOrder);

    app.post('/api/orders', orderController.addNewOrderFromStore);

    app.get('/tracking/:id', orderController.trackOrder);

}