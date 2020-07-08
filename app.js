const express=require('express');
const path=require('path')
const notmsg=require('./notification/notification')
const bodyParser = require('body-parser');
const tweliotoken=require('./tweliochat/generatetoken');
const app=express();
var unirest = require("unirest");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/twichat', function(req, res, next) {
	res.sendFile(path.join(__dirname,'/public/chat.html'));
  });
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });
var reqs = unirest("GET", "https://language-translation.p.rapidapi.com/translateLanguage/translate");

app.post('/token', function(req, res) {
	console.log(req.body.identity)
	var deviceId = req.body.identity;
	var identity = req.body.identity;
  
	var token = tweliotoken.generate(identity, deviceId)
  
	res.json({
	  identity: identity,
	  token: token.toJwt(),
	});
  });





app.listen(3000,
    console.log("port is running"))