var Score = require('../models').Score;
//var User = require('../models').User;
var superagent = require('superagent-charset');
var cheerio = require('cheerio');

exports.getScore = function (sid, callback) {
    Score.findOne({'sid':sid}, callback);
};

exports.getScoreByApi = function (sid, callback) {
    superagent.get('http://jwc.ecjtu.jx.cn/mis_o/cj.php?sid=' + sid)
    .end(callback);
};


exports.newAndSave = function (sid, name, items, callback) {
  var score = new Score();
  score.sid = sid;
  score.na = name;
//  var i = new 
  score.items = items;
  score.save(callback);
};

exports.getSScore = function (sid, callback) {
	superagent.post('http://jwc.ecjtu.jx.cn/mis_o/login.php')
  .send("user=jwc&pass=jwc&Submit=%CC%E1%BD%BB")
  .end(function(err,sres){
    //console.log(sres.text);
    var cookies = sres.header['set-cookie'];
    console.log(cookies);
    superagent.post('http://jwc.ecjtu.jx.cn/mis_o/tdquery.php')
    .send("StuID=" + sid)
    .charset('gb2312')
    .set("Cookie", cookies)
    .end(function(err, sres2){
      //console.log(sres2.text);
      var items = [];
      var $ = cheerio.load(sres2.text);
      //console.log($('table').last().text());
      $('table').last().children().each(function(idx, elem) {
        //console.log(elem);
        var $elem = $(elem).children();
      //  console.log($elem.eq(0).text());
     // if($elem.eq(0).text()!===term) continue;
        items.push({
          term: $elem.eq(0).text(),
          id: $elem.eq(1).text(),
          name: $elem.eq(2).text(),
          course: $elem.eq(3).text(),
          isN: $elem.eq(4).text(),
          credit: $elem.eq(5).text(),
          score: $elem.eq(6).text(),
          score1: $elem.eq(7).text(),
          score2: $elem.eq(8).text()
        })
      });
      items.shift();
      callback(items);
    })
  })
;} 