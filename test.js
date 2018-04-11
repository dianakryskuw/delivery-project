var chai = require('chai');
var orderController = require('./server/controllers/orderController');
const assert = require('chai').assert;
var request = require('request');

describe('calculatePrice(distance,weight)', function() {
  it('checking for one item, for 20000 km', function() {
    var expect=orderController.calculatePrice(20000,1);
    var result=22;
    assert.equal(expect, result);
});
it('checking for negative distance', function() {
    var expect=orderController.calculatePrice(-10000,1);
    var result=20;
    assert.equal(expect, result);
});
it('checking for zero weight', function() {
    var expect=orderController.calculatePrice(10000,0);
    var result=20;
    assert.equal(expect, result);
});
});

describe('POST api/orders', function() {
    var order ={
        arrivalPoint:{
            lat:48.02715491,
            lng:24.57290406
        },
        items:[
            {
                name:'scarf'
            },
            {
                name:'watch'
            }
        ],
        email:'diana.kryskuw@gmail.com'
    }
    it('checking for one item, for 20000 km', function() {
    request('https://delivery-service08.herokuapp.com/api/orders' , function(error, response, body) {
        
        done();
    });
});
});
