var User = require('../models/user').User;
var HttpError = require('../error').HttpError;

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
			user = new User({
				username: username,
				password: password
			});
			user.save(function(err) {
				if (err) {
					return next(err);
				}
				req.session.user = user._id;
				res.send({});
			});
		} else {
			next(new HttpError(409, 'User Already Exists'));
		}
	});
};