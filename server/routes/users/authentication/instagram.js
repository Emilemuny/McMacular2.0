'use strict';

var User = require('../../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply){
    User.instagram(request.payload, function(profile){
      User.create('instagram', profile, function(err, user){
        if(err){
          reply().code(400);}
        var token = user.token();
        reply({token:token, user:user});
      });
    });
  }
};
