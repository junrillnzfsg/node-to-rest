module.exports = (app) => {
	const task = require('../controllers/TaskController')
	const auth = require('../../utilities/auth')

	// task Routes
	app.route('/v1/tasks')
		.get(auth.verifyToken, task.listAllTasks)
		.post(auth.verifyToken, task.createTask)


	app.route('/v1/tasks/:taskId')
		.get(auth.verifyToken, task.readTask)
		.put(auth.verifyToken, task.updateTask)
		.delete(auth.verifyToken, task.deleteTask)
}