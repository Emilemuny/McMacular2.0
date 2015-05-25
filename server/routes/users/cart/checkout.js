/* jshint camelcase:false */

'use strict';

var Order = require('../../../models/orders');

module.exports = {
  handler: function(request, reply){
    Order.findOne({userId: request.auth.credentials._id}, function(err,order){
      order.purchase(request.payload, function(err, charge){
        if (err){
          console.log('ERROR****', err);
          return reply().code(400);
        }else{
          order.payment.Type = charge.source.brand;
          order.payment.transaction_id = charge.id;
          order.payment.status = charge.status;
          order.payment.paid = charge.paid;
          order.ordersremaining = order.ordersremaining --;
          order.save(function(err, cb){
            if(err){ console.log('ERROR', err);}

            console.log('succss', cb);
          });
        }
      });
    });
    reply().code(200);
  }
};
