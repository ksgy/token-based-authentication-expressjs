var express = require('express');
var jwt = require('express-jwt');
var bodyParser = require('body-parser'); //bodyparser + json + urlencoder
//var morgan  = require('morgan'); // logger
var key = require('./config/key.js');
var app = express();

app.listen(3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//expressapp.use(morgan());

app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  //res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

//Routes
var users = require('./route/users.js');
app.use('/users', users);

// // ### Error handling ##################################
app.use(function(req, res, next){

	res.status(404);

	// respond with json
	if (req.accepts('json')) {
		res.send({ error: 'Not found' });
		return;
	}

	// default to plain-text. send()
	res.type('txt').send('Not found');

});
// // ### Error handling ##################################

console.log('starting on port 3001');