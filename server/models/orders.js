/* jshint camelcase:false */

'use strict';

var mongoose = require('mongoose');
var stripe = require('stripe')(process.env.STRIPE_KEY);
var Orders;


var ordersSchema = mongoose.Schema({
  customerId: String,
  createdOn: {type: Date, default: Date.now, required: true},
  shipping: {
    customer: String,
    address: String,
    email: String,
  },
  payment:{
    method: String,
    transaction_id: Number,
    date: {type: Date, default: Date.now}
  },
  products: {
    qty: Number,
    fitsize: String
  }
});

ordersSchema.statics.purchase = function(o, cb){
  stripe.charges.create({
    amount: 271,
    currency: 'usd',
    source: o.token,
    description: o.info.name + ' Purchased a Macmacular product'
  }, function(err, charge){
    if(!err){
      // this.payment.transaction_id = charge.id;
      // this.payment.date = new Date();
      // this.shipping.customer = o.info.name;
      // this.shipping.address = o.info.address + o.info.city + o.info.state + o.info.zipcode + o.info.country;
      // this.shipping.email = o.info.email;

      console.log('No error');
    }
    cb(err, charge);
  });
};


Orders = mongoose.model('Orders', ordersSchema);
module.exports = Orders;
