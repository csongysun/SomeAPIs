var Score = require('../proxy').Score;
var validator = require('validator');
//var ScoreItem = require('../scoreitem').ScoreItem;


var sta = 0,
    con;

function sss(res) {
    var post_data = ({
        status: sta,
        content: con
    });
    //   console.log(con);
    res.send(post_data);
}

exports.scx = function(req, res, next) {
    var sid = validator.trim(req.query.sid);
    Score.getSScore(sid, function(items) {
        res.send(items);
    })

}


exports.cx = function(req, res, next) {
    var sid = validator.trim(req.query.sid);
    var term = validator.trim(req.query.term);
    term = term.substr(0, 4) + "." + term.substr(-1,1);
    console.log(term);
    // var pwd = validator.trim(req.query.pwd);

    sta = 0;
    con = [];
   // con.sid = sid;


    // Score.getScore(sid, function(err, gScore) {

    //             if (err) {
    //                 con = "error";
    //                 return sss(res);
    //             }

    //             if (gScore) {
    //                 sta = 1;
    //                 con.name = gScore.na;
    //                 con.score = gScore.items;

    //                 return sss(res);
    //             }


    Score.getScoreByApi(sid, function(err, sres) {
        if (err||sres.text==="") {
            con = "wrong";
            return sss(res);
        }
        sta = 1;
        var obj = eval(sres.text);
       // console.log(obj);
        for(var x in obj) {
            var item = obj[x];
          //  console.log(obj[x]);
            if (item["Term"]===term) {
              //  console.log(1);
            //  console.log(item[]);
                con.push({
                    course: item["Course"],
                    score: item["Score"],
                    score1: item["FirstScore"],
                    score2: item["SecondScore"],
                    pass: item["Pass"]
                })
            }
        }

        return sss(res);
        // var xitems = eval(sres.text);
        //    console.log(xitems[0].Course);
        //     var name = xitems[0].Name;

        // if (xitems.length < 1) {
        //     con = "wrong sid";
        //     return sss(res);
        // }

        //         var items = new Array();


        //         for (var x in xitems) {
        //             var item = new Object();
        //             item.course = xitems[x].Course;
        //             item.grade = xitems[x].Score;
        //             item.grade1 = xitems[x].FirstScore;
        //             item.grade2 = xitems[x].SecondScore;
        //             items.push(item);
        //             //         console.log(xitems[x]);
        //         }

        //       //      console.log(items);

        //         Score.newAndSave(sid, name, items, function(err) {
        //             if (err) {
        //                 console.log(err);
        //                 con = "something wrong";
        //                 return sss(res);
        //             }
        //             sta = 1;
        //             con.name = name;
        //             con.score = items;
        //             return sss(res);

        //         });

        //     });
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