var jwt = require('jsonwebtoken');
var key = require('../config/key');
var SALT_WORK_FACTOR = 10;

var returns = {
	success: false,
	token: null,
	httpCode: null,
	message: null
}

exports.signin = function(username, password) {


	if (username == 'thiago.ventura' && password == 'test') {

		var token = jwt.sign({id: 11111}, key.secretToken, { expiresInMinutes: 1 });

		returns.token = token;
		returns.success = true;
		returns.httpCode = 200;

		return returns;


	}else{

		returns.token = null;
		returns.httpCode = 401;
		returns.success = false;

		return returns;
	}


};