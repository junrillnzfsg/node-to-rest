const authRoutes = require('./AuthRoutes')
const taskRoutes = require('./TaskRoutes')

module.exports = (app) => {
	authRoutes(app)
	taskRoutes(app)
}