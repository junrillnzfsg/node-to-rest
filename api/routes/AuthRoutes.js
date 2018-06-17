module.exports = (app) => {
	const auth = require('../controllers/AuthController')

	app.route('/v1/auth/register')
		.post(auth.createUser)

	app.route('/v1/auth/me')
		.post(auth.userInfo)

	app.route('/v1/auth/login')
		.post(auth.loginUser)

	app.route('/v1/auth/logout')
		.post(auth.logoutUser)
}