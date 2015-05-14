'use strict';

module.exports = {
  auth: false,
  handler: function(request, reply) {
    reply({email:request.auth.credentials.email});
  }
};
