var mongoose = require('../libs/mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var taskSchema = new Schema({
	list: {
		type: ObjectId,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	isDone: {
		type: Boolean,
		default: false
	}
});

taskSchema.statics.getTasks = function(list, callback) {
	var Task = this;
	console.log(list);
	mongoose.models.list.findOne({
		name: list
	}, function(err, list) {
		Task.find({
			list: list._id
		}, callback);
	});
};

exports.Task = mongoose.model('task', taskSchema);