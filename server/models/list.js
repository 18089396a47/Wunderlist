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
	if (this.users.indexOf(user) === -1) {
		this.users.push(user);
	}
};

listSchema.methods.removeUser = function(user) {
	if (this.users.indexOf(user) !== -1) {
		this.users.splice(this.users.indexOf(user));
	}
};

listSchema.statics.getLists = function(user, callback) {
	var List = this;
	List.find({
		users: user
	}, callback);
};

exports.List = mongoose.model('list', listSchema);