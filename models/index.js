var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect("mongodb://127.0.0.1/api", function (err) {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
require('./user');
require('./score');
//require('./scoreitem')


exports.User = mongoose.model('User');
//exports.ScoreItem = mongoose.model('ScoreItem');
exports.Score = mongoose.model('Score');
//exports.ScoreItemSchema = mongoose.model('ScoreItemSchema');
