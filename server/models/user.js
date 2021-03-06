/* jshint camelcase:false */

'use strict';

var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var qs = require('querystring');
var Request = require('request');
var moment = require('moment');
var jwt = require('jwt-simple');

var User;

var userSchema = mongoose.Schema({
    email: String,
    password: {type: String, select: false},
    displayName: String,
    photoUrl: String,
    phone: String,
    github: String,
    google: String,
    linkedin: String,
    facebook: String,
    twitter: String,
    instagram: String,
    createdAt: {type: Date, default: Date.now, required: true}
});

userSchema.statics.preTwitter = function(cb){
  let requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
  let authenticateUrl = 'https://api.twitter.com/oauth/authenticate';
  let requestTokenOauth = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    callback: 'http://localhost:3000'
  };

    Request.post({url:requestTokenUrl, oauth:requestTokenOauth}, (err, response, body)=>{
      let oauthToken = qs.parse(body);
      let params = qs.stringify({oauth_token:oauthToken.oauth_token});
      cb(authenticateUrl + '?' + params);
    });
};

userSchema.statics.twitter = function(query, cb){
  let accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
  let accessTokenOauth = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    token: query.oauth_token,
    verifier: query.oauth_verifier
  };

  Request.post({url:accessTokenUrl, oauth:accessTokenOauth}, (err, response, profile)=>{
    profile = qs.parse(profile);
    cb({twitter:profile.user_id, displayName:profile.screen_name});
  });
};

userSchema.statics.facebook = function(payload, cb) {
  let accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
  let graphApiUrl = 'https://graph.facebook.com/me';
  let params = {
    code: payload.code,
    client_id: payload.clientId,
    redirect_uri: payload.redirectUri,
    client_secret: process.env.FACEBOOK_SECRET
  };

  Request.get({url: accessTokenUrl, qs: params, json: true}, (err, response, accessToken) => {
    console.log(accessToken);
    accessToken = qs.parse(accessToken);
    Request.get({url: graphApiUrl, qs: accessToken, json: true}, (err, response, profile) => {
      cb({ facebook: profile.id, displayName: profile.name, photoUrl: `https://graph.facebook.com/${profile.id}/picture?type=large`});
    });
  });
};

userSchema.statics.google = function(payload, cb) {
  let accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  let userApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  let params = {
    code: payload.code,
    client_id: payload.clientId,
    redirect_uri: 'http://localhost:3000',
    client_secret: process.env.GOOGLE_SECRET,
    grant_type: 'authorization_code'
  };
  Request.post(accessTokenUrl, { json: true, form: params }, (err, response, token) => {
    let accessToken = token.access_token;
    let headers = { Authorization: 'Bearer ' + accessToken };
    Request.get({url:userApiUrl, headers:headers, json:true}, (err, response, profile) => {
      cb({google:profile.sub, displayName:profile.name, photoUrl: profile.picture});
    });
  });
};

userSchema.statics.instagram = function(payload, cb) {
  let accessTokenUrl = 'https://api.instagram.com/oauth/access_token';
  let params = {
    code: payload.code,
    client_id: payload.clientId,
    redirect_uri: 'http://localhost:3000',
    client_secret: process.env.INSTAGRAM_SECRET,
    grant_type: 'authorization_code'
  };

  Request.post(accessTokenUrl, { json: true, form: params }, (err, response, body) => {
      cb({instagram:body.user.id, displayName:body.user.username, photoUrl: body.user.profile_picture});
    });

};

userSchema.statics.create = function(provider, profile, cb){
  let query = {};
  query[provider] = profile[provider];
  User.findOne(query, (err, user)=>{
    if(user){return cb(err, user);}

    let u = new User(profile);
    u.save(cb);
  });
};

userSchema.methods.token = function(){
  let payload = {
    sub: this._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };

  return jwt.encode(payload, process.env.TOKEN_SECRET);
};

userSchema.statics.register = function(o, cb){
  console.log('Object coming in****', o);
  User.findOne({email:o.email}, function(err, user){
    if(user){return cb(true);}

    user = new User(o);
    user.password = bcrypt.hashSync(o.password, 8);
    user.save(cb);
  });
};

userSchema.statics.authenticate = function(o, cb){
  User.findOne({email:o.email}, '+password', function(err, user){
    if (!user) {return cb(true);}

    let isGood = bcrypt.compareSync(o.password, user.password);
    if (!isGood) {return cb(true);}

    user.password = null;
    cb(null, user);
  });
};

User = mongoose.model('User', userSchema);
module.exports = User;
