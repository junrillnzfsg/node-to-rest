const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TaskSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name of task is required']
	},
	userId: {
		type: String,
		require: [true, 'User ID is required']
	},
	createdDate: {
		type: Date,
		default: Date.now
	},
	status: {
		type: [{
			type: String,
			enum: ['pending', 'ongoing', 'completed']
		}],
		default: ['pending']
	}
})

module.exports = mongoose.model('Task', TaskSchema)