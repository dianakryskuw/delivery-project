var chai = require('chai');
var orderController = require('../controllers/orderController');
var should = chai.should();
const assert = require('chai').assert;

describe('', function() {
  it('shhh', function() {
    var expect=orderController.calculatePrice(10000,1);
    var result=20;
    assert.equal(expect, result);
});
});
