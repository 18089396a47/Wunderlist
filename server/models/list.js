var mongoose = require('../libs/mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var listSchema = new Schema({
	owner: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	users: [String]
});

listSchema.methods.addUser = function(user) {
	this.users.push(user);
};

listSchema.methods.removeUser = function(user) {
	this.users.splice(this.users.find(user));
};

listSchema.statics.getLists = function(user, callback) {
	var List = this;
	List.find({
		users: user
	}, callback);
};

exports.List = mongoose.model('list', listSchema);