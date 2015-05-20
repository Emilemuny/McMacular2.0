'use strict';

var Prelaunchuser = require('../../config/vip.json');
var Joi = require('joi');

module.exports = {
  validate:{
    payload:{
      username : Joi.string().required(),
      password: Joi.string().required()
    }
  },
  auth: false,
  handler: function(request, reply){
    var rusername = Prelaunchuser.username;
    var rpassword = Prelaunchuser.password;

    if((rusername === request.payload.username) && (rpassword === request.payload.password)){
      reply({user:rusername}).code(200);
    }else{
      reply().code(400);
    }
  }
};
