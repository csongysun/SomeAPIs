var User = require('../proxy').User;
var validator = require('validator');



var sta = 0,
    con;

function sss(res) {
    var post_data = ({
        status: sta,
        content: con,
    });
    console.log(con);
    res.send(post_data);
}


exports.login = function(req, res, next) {
    var uid = validator.trim(req.query.uid).toLowerCase();
    var pwd = validator.trim(req.query.pwd);

    User.getUserByUid(uid, function(err, user){
        if(err){
            con = "error";
            return sss(res);
        }

        if(user){
            sta = 1;
            con = {
                uid: uid,
                nickname: user.nickname,
                phone: user.phone,
                stuid: user.stuid,
                sex: user.sex,
                ecardpassword: user.ecard_pwd
            };

            return sss(res);
        }

        con = "wrong email or password";

        return sss(res);

    });
};


exports.signup = function(req, res) {

    console.log(req.body.uid);

    var uid = validator.trim(req.body.uid).toLowerCase();
    var pwd = validator.trim(req.body.pwd);
    var stuid = validator.trim(req.body.stuid);
    var nickname = validator.trim(req.body.nickname);
    var phone = validator.trim(req.body.phone);
    var sex = validator.trim(req.body.sex);
    var ecard = validator.trim(req.body.ecard);




    if (validator.isNull(uid)) {
        con = "lack of the necessary parameters uid";
        return sss(res);
    }
    if (!validator.isEmail(uid)) {
        con = "Please enter a valid email address";
        return sss(res);

    }
    if (!pwd || pwd == '') {
        con = "lack of the necessary parameters pwd";
        return sss(res);

    }
    if (validator.isNull(nickname)) {
        con = "lack of the necessary parameters nickname";
        return sss(res);

    }
    if (nickname.length < 2 || nickname.length > 10) {
        con = "The nickname restrictions 2-10 character";
        return sss(res);

    }


    User.getUserByUid(uid, function(err, user) {
        if (err) {
            con = "error";
            return sss(res);
        }

        if (user) {
            con = "this email already exist";
            return sss(res);
        }

        User.newAndSave(uid, pwd, stuid, phone, nickname, sex, ecard, function(err) {
            if (err) {
                con = "error";
                return sss(res);
            }
            sta = 1;
            con = {
                uid: uid,
                nickname: nickname,
                phone: phone,
                stuid: stuid,
                sex: sex,
                ecardpassword: ecard
            };

            return sss(res);

        });



    });
};