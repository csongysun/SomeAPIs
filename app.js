var express = require('express');
var sign = require('./controllers/sign');
var bodyParser = require('body-parser');
var yxdl = require('./controllers/yxdl');
var ecard = require('./controllers/ecard');
var score = require('./controllers/score');
var app = express();

    
  //app.use(express.bodyParser());  

  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var router = express.Router();
router.post('/signup', sign.signup);
router.get('/yxdl',yxdl.corc);
router.get('/cxcj',score.cx);
router.get('/ecard',ecard.cx);
router.get('/sxw',score.scx);
router.get('/cls',ecard.getCls);
app.use('/',router);

app.get('/login',sign.login);

app.listen(8100, function (err,req, res) {
	if(err){
		return console.log(err);
	}
  console.log('app is running at port 8100');
});
