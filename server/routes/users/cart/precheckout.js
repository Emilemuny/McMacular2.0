'use strict';

var Precheckoutinfo = require('../../../models/precheckout');


module.exports = {
  auth: false,
  handler: function(request, reply){
    var precheckoutinfo = new Precheckoutinfo(request.payload);
    precheckoutinfo.save(function(err){
      if(err){reply().code(400);}

      reply().code(200);
    });
  }
};
