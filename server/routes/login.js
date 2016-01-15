var User = require('../models/user').User;
var async = require('async');
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;
var path = require('path');

exports.get = function(req, res, next) {
	res.sendFile(path.join(__dirname, '../public/index.html'));
};

exports.post = function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	User.authorize(username, password, function(err, user) {
		if (err) {
			if (err instanceof AuthError) {
				return next(new HttpError(err.status, err.message));
			} else {
				return next(err);
			}
		}
		if (!user) {
			return next(new HttpError(404, 'User Not Found'));
		}
		req.session.user = user._id;
		res.send({});
	});
};