//var User = require('../proxy').User;
var validator = require('validator');
var superagent = require('superagent-charset');
var request = require('request');
var cheerio = require('cheerio');
var request = request.defaults({
    jar: true
});

var m = require('./md5.js');

var uid, pwd, a;
var cookiename = "dcpcascookie";
var cas_domain = "cas.ecjtu.edu.cn";

var sta = 0,
    con;

var coo;

function sss(res) {
    var post_data = ({
        status: sta,
        content: con,
    });
    console.log(con);
    res.send(post_data);
}

function SetUserNameCookies() {
    var c = new Date();
    c.setTime(c.getTime() + 365 * 24 * 60 * 60 * 1000);
    var a = uid;
    var b = a;
    var d = false;
    if (d == false) {
        coo = cookiename + "=" + a + "||" + "neusoft" + "||" + d + ";expires=" + c.toGMTString()
    }
}


exports.cx = function(req, res, next) {
    console.log("aa");

    uid = req.query.uid;
    pwd = req.query.pwd;
    var ecd = req.query.ecd;
    a = m.sE(pwd);

    console.log(a);

    SetUserNameCookies();

    superagent.get('cas.ecjtu.edu.cn/cas/login')
        .end(function(err, sres) {
            var $ = cheerio.load(sres.text);
            var lt = $("input[name='lt']").val();
            console.log(lt);

            superagent.post('cas.ecjtu.edu.cn/cas/login')

                .send('username=' + uid)
                .send('password=' + a)
                .send('lt=' + lt)
                .end(function(err, sres2) {
                    if (err) return console.log(err);
                    console.log("body:\n"+sres2.text);

                    res.send("body:");

                    //  $ = cheerio.load()

                });

        });
};


exports.getCls = function(req, res, next) {
    term = req.query.term;
    banji = req.query.banji;
    var s = {
        status: 0,
        content: 'none'
    }
    console.log("somebody query for class search");
    superagent.post("http://jwc.ecjtu.jx.cn:8080/jwcmis/classroom/class.jsp")
.send("term=" + term + "&banji=" + banji)
.charset("gb2312")
.end(function(err, sres) {
    var kb = [];
    var $ = cheerio.load(sres.text.replace(/&nbsp;/g, ' '), {decodeEntities: false});
    $('table').children().each(function(idx, elem) {
        $elem = $(elem).children();
        var line = [];
        $elem.each(function(idx, elem2) {

            line.push($(elem2).children().children().html().replace(/<br>/g, '\n'));
        });
        kb.push(line);
    });

    s.status = 1;
    s.content = kb;
    //console.log(kb);
    res.send(s);

})
}