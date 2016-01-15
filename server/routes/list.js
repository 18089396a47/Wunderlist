var path = require('path');
var mongoose = require('mongoose');
var Task = require('../models/task').Task;

exports.get = function(req, res, next) {
	if (req.xhr || req.headers.accept.indexOf('json') !== -1) {
		Task.getTasks(req.query.list, function(err, tasks) {
			if (err) {
				throw err;
			}
			res.json(tasks);
		});
	} else {
		res.sendFile(path.join(__dirname, '../public/index.html'));
	}
};

exports.post = function(req, res, next) {
	var taskname = req.body.taskname;
	var listname = req.body.listname;
	mongoose.models.list.findOne({
		name: listname
	}, function(err, list) {
		if (err) {
			throw err;
		}
		var task = new Task({
			name: taskname,
			list: list._id
		});
		task.save(function(err) {
			if (err) {
				return next(err);
			}
			res.send({});
		});
	});
};