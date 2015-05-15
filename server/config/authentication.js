'use strict';

var moment = require('moment');
var User = require('../models/user');

module.exports = {
  key: process.env.TOKEN_SECRET,
  validateFunc: function(jwt, cb){
    var current = moment().unix();
    if(current < jwt.iat || current > jwt.exp){
      return cb();
    }
    User.findById(jwt.sub, function(err, user){
      if(err || !user){
        return cb();
      }
      cb(null, true, user);
    });
  }
};
