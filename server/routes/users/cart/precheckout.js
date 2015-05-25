'use strict';

var Order = require('../../../models/orders');
module.exports = {
  handler: function(request, reply){
    var data = {
      userId: request.auth.credentials._id,
      name: request.payload.name,
      lastname: request.payload.lastname,
      address: request.payload.address,
      city: request.payload.city,
      state: request.payload.state,
      zipcode: request.payload.zipcode,
      country: request.payload.country,
      email: request.payload.email,
      product: request.payload.product,
    };
    var order = new Order(data);
    order.save(function(){
      reply({order:order});
    });
  }
};
