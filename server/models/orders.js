/* jshint camelcase:false */

'use strict';

var mongoose = require('mongoose');
var stripe = require('stripe')(process.env.STRIPE_KEY);
var Order;

var orderSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  name: String,
  lastname: String,
  address: String,
  city: String,
  state: String,
  zipcode: String,
  country: String,
  email: String,
  product: String,
  payment:{
    Type: String,
    transaction_id: String,
    status: String,
    paid: Boolean,
    date: {type: Date, default: Date.now}
  },
  createdAt: {type: Date, default: Date.now, required: true},
  ordersremaining: {type: Number, default: 300, required: true}
});

orderSchema.methods.purchase = function(o, cb){

  console.log('Objects coming in model', o);
  stripe.charges.create({
    amount: 237,
    currency: 'usd',
    source: o.token,
    description: o.info.name + ' Purchased a Macmacular product',
    receipt_email: o.info.email
  }, function(err, charge){
    if(!err){

      console.log('No error');
    }
    cb(err, charge);
  });
};

Order = mongoose.model('Order', orderSchema);
module.exports = Order;
