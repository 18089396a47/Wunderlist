var path = require('path');
var mongoose = require('mongoose');
var List = require('../models/list').List;
var HttpError = require('../error').HttpError;

exports.get = function(req, res, next) {
	if (req.xhr || req.headers.accept.indexOf('json') !== -1) {
		List.getLists(req.query.user, function(err, lists) {
			if (err) {
				throw err;
			}
			//console.log(lists);
			res.json(lists);
		});
	} else {
		if (false) {
			res.redirect('/login');
		} else {
			res.sendFile(path.join(__dirname, '../public/'));
		}
	}
};

exports.post = function(req, res, next) {
	var listname = req.body.listname;
	var username = req.body.user;
	List.ensureIndexes(function() {
		var list = new List({
			owner: username,
			name: listname
		});
		list.addUser(username);
		list.save(function(err) {
			if (err) {
				return next(new HttpError(err));
			}
			res.send({});
		});
	});
};