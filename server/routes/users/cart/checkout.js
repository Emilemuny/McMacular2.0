'use strict';

var Orders = require('../../../models/orders');

module.exports = {
  auth: false,
  handler: function(request, reply){
  Orders.purchase(request.payload, function(err, charge){
    if(err){
      console.log('error****',err);
      return reply().code(400);
      }
    console.log('chargeInfo****', charge);

    reply({charge:charge});
  });

  }

};
