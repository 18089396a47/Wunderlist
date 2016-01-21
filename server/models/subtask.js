var mongoose = require('../libs/mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var subtaskSchema = new Schema({
	task: {
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

subtaskSchema.statics.getTask = function(task, callback) {
	var Subtask = this;
	mongoose.models.task.findById(task, function(err, task) {
		Subtask.find({
			task: task
		}, callback);
	});
};

exports.Subtask = mongoose.model('subtask', subtaskSchema);