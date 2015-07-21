var math = require('mathjs');
//var app = express();

exports.corc = function(req, res, next) {

var q1 = req.query.q1;
var q2 = req.query.q2;
var q3 = req.query.q3;

//console.log(q2);

var a = parseFloat(q1);
var b = parseFloat(q2);
var c = parseFloat(q3);

//console.log(b);

var cosx = (a * a + b * b - c * c) / (2 * a * b);
//console.log(cosx);

var x = math.acos(cosx);

var xx = (x / Math.PI) * 180;

//console.log(xx);

res.send(xx.toString());


};