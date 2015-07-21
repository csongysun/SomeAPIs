var User = require('../models').User;

exports.getUserByUid = function (uid, callback) {
 User.findOne({'email': uid}, callback);
};

exports.newAndSave = function (email, pass, stuid, phone, nickname, sex, epwd, callback) {
  var user = new User();
  user.email = email;
  user.pass = pass;
  user.stuid = stuid;
  user.phone = phone;
  user.nickname = nickname;
  user.sex = sex;
  user.ecard_pwd = epwd;
  user.save(callback);
};