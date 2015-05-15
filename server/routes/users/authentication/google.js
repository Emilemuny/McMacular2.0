'use strict';

var User = require('../../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply){
    User.google(request.payload, function(profile){
      User.create('google', profile, function(err, user){
        if(err){ reply().code(400);}
        var token = user.token();
        reply({token:token, user:user});
      });
    });
  }
};
