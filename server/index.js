'use strict';

require('babel/register');

var Hapi = require('hapi');
var Fs = require('fs');
var Url = require('url');
var path = require('path');
var server = new Hapi.Server();
var plugins = require('./config/plugins');
var routes = require('./config/routes');
var authentication = require('./config/authentication');
var mongoose = require('mongoose');

var config = {
    host: 'localhost',
    http: { port: 3001 },
    https: {
        port: 3000,
        key: Fs.readFileSync(path.join(__dirname, '../../mcmaccerts/mcmac.pem'), 'utf8'),
        cert: Fs.readFileSync(path.join(__dirname, '../../mcmaccerts/www_mcmacular_com.pem'), 'utf8')
    }
};


server.connection({
    port: config.https.port,
    tls: {
        key: config.https.key,
        cert: config.https.cert
    }
});

mongoose.connect(process.env.MONGO_URL);
server.connection({ port: config.http.port });

mongoose.connection.once('open', function(){
  server.register(plugins, function(){
    server.auth.strategy('token', 'jwt', true, authentication);
    server.route(routes);
    server.ext('onRequest', function (request, reply) {
        if (request.connection.info.port !== config.https.port) {
            return reply.redirect(Url.format({
                protocol: 'https',
                hostname: config.host,
                pathname: request.url.path,
                port: config.https.port
            }));
        }
        reply.continue();
    });
    server.start(function(){
      console.log('info', server.info.uri);
      console.log('info', process.env.MONGO_URL);
    });
  });
});

module.exports = server;
