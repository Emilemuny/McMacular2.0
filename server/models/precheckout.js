'use strict';

var mongoose = require('mongoose');
var Precheckoutinfo;

var precheckoutinfoSchema = mongoose.Schema({

  name: String,
  lastname: String,
  email: String,
  address: String,
  productinfo: String,
  createdAt: {type: Date, default: Date.now, required: true}
});

Precheckoutinfo = mongoose.model('Precheckoutinfo', precheckoutinfoSchema);
module.exports = Precheckoutinfo;
