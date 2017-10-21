var express = require('express');
var CodeBreaker = require('./CodeBreaker');
var code = new CodeBreaker();

var app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/setSecret/:secret', function(req, res) {
	number = req.params.secret;
	code.setSecret(number);
	res.send({message: 'Let the games begin.'})
});

app.get('/tryCode/:secret', function(req, res) {
	number = req.params.secret;
	res.send({result: code.tryCode(number)})
});

module.exports = app;