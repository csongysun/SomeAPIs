var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var utility = require('utility');

var UserSchema = new Schema({
  email: { type: String},
  pass: { type: String },
  stuid: { type: String},
  phone: { type: String },
  nickname: { type: String},
  create_at: { type: Date, default: Date.now },
  sex: { type: Boolean },
  ecard_pwd: {type: String}
});



UserSchema.index({email: 1}, {unique: true});
UserSchema.index({stuid: 1}, {unique: true});
UserSchema.index({phone: -1});

mongoose.model('User', UserSchema);