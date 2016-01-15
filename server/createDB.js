var mongoose = require('./libs/mongoose');
var async = require('async');

async.series([
	open,
	dropDB,
	requireModels,
	createUsers
], function(err) {
	if (err) {
		throw err;
	}
	mongoose.disconnect();
});

function open(callback) {
	mongoose.connection.on('open', callback);
}

function dropDB(callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
}

function requireModels(callback) {
	require('./models/user');
	async.each(Object.keys(mongoose.models), function(modelName, callback) {
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
}

function createUsers(callback) {
	var users = [{
		username: 'admin@admin.admin',
		password: 'admin'
	}];
	async.each(users, function(userData, callback) {
		var user = new mongoose.models.user(userData);
		user.save(callback);
	}, callback);
}