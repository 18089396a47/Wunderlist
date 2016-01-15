var crypto = require('crypto');
var async = require('async');
var util = require('util');

var mongoose = require('../libs/mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

userSchema.methods.encryptPassword = function(password) {
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

userSchema.virtual('password')
	.set(function(password) {
		this._plainPassword = password;
		this.salt = Math.random() + '';
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function() {
		return this._plainPassword;
	});

userSchema.methods.checkPassord = function(password) {
	return this.encryptPassword(password) === this.hashedPassword;
};

userSchema.statics.authorize = function(username, password, callback) {
	var User = this;
	async.waterfall([
		function(callback) {
			User.findOne({
				username: username
			}, callback);
		},
		function(user, callback) {
			if (user) {
				if (user.checkPassord(password)) {
					callback(null, user);
				} else {
					callback(new AuthError(403, 'Invalid password'));
				}
			}
		}
	], callback);
};

exports.User = mongoose.model('user', userSchema);

function AuthError(status, message) {
	Error.apply(this, arguments);
	Error.captureStackTrace(this, AuthError);

	this.status = status;
	this.message = message || 'Error';
}

util.inherits(AuthError, Error);
AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;