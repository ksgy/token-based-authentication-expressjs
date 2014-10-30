var express = require('express');
var jwt = require('express-jwt');

var users = require('../service/users.js');
var key = require('../config/key.js');

var router = express.Router();

//Login
router.post('/signin', function(req, res){

	try{

		var username = req.body.username || '';
		var password = req.body.password || '';

		if (username == '' || password == '') { 
			throw new Error('Undefined data.');
		}

		var returns = users.signin(username, password);
		res.send(returns);

	}catch(e){

		res.status(500);
		res.send({ error: e.message });

	}


});

//All
router.post('/restricted', jwt({secret: key.secretToken}), function(req, res){

	try{

		return res.json(200, 'ok');

	}catch(e){

		res.status(500);
		res.send({ error: e.message });

	}


});

module.exports = router;