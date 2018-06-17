const mongoose = require('mongoose')
const Task = mongoose.model('Task')

class TaskController {
	listAllTasks(req, res) {
		Task.find({userId: req.userId}, (err, task) => {
			if (err) return res.status(400).send(err)
			res.json(task)
		})
	}

	createTask(req, res) {
		const taskParams = Object.assign({}, req.body, { userId: req.userId })
		const newTask = new Task(taskParams)
		newTask.save((err, task) => {
			if (err) return res.send(err)
			res.json(task)
		})
	}

	readTask(req, res) {
		Task.findById(req.params.taskId, (err, task) => {
			if (err) return res.status(400).send(err)
			res.json(task)
		})
	}

	updateTask(req, res) {
		Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, (err, task) => {
			if (err) return res.status(400).send(err)
			res.json(task)
		})
	}

	deleteTask(req, res) {
		Task.remove({
			_id: req.params.taskId
		}, (err) => {
			if (err) return res.status(400).send(err)
			res.json({ message: 'Task successfully deleted' })
		})
	}
}

module.exports = new TaskController()