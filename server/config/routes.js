'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},

  {method: 'post', path: '/auth/signup', config: require('../routes/users/authentication/register')},
  {method: 'post', path: '/auth/login', config: require('../routes/users/authentication/login')},

  {method: 'post', path: '/auth/facebook', config: require('../routes/users/authentication/facebook')},
  {method: 'post', path: '/auth/google', config: require('../routes/users/authentication/google')},
  {method: 'get', path: '/auth/twitter', config: require('../routes/users/authentication/twitter')},
  {method: 'post', path: '/auth/instagram', config: require('../routes/users/authentication/instagram')},

];
