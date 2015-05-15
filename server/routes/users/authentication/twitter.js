/* jshint camelcase:false */

'use strict';

var User = require('../../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply){
    if(!request.query.oauth_token || !request.query.oauth_verifier){
      User.preTwitter(function(url){
        reply.redirect(url);
      });
    }else{
      User.twitter(request.query, function(profile){
        User.create('twitter', profile, function(err, user){
          if(err){ reply().code(400);}
          var token = user.token();
          reply({token:token, user:user});
        });
      });
    }
  }
};
