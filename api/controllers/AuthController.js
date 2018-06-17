const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const auth = require('../../utilities/auth')
const User = mongoose.model('User')

class AuthController {
	createUser(req, res) {
		const hashedPassword = bcrypt.hashSync(req.body.password, 8)
		User.create({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword
		}, (err, user) => {
			if(err) return res.status(400).send(err)
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: parseInt(process.env.TOKEN_EXPIRES, 10) })
			res.status(200).send( { auth: true, token })
		})
	}

	userInfo(req, res) {
		const authorizationToken = req.headers.authorization
		if(!authorizationToken) return res.status(401).send({ auth: false, message: 'JWT Token is required' })
		const token = auth.tokenStripBearer(authorizationToken)

		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if(err) return res.status(500).send({auth: false, message: 'Authentication Failed'})
			User.findById(decoded.id, (err, user) => {
				if(!user) return res.status(404).send('No User Found')
				res.status(200).send(user)
			})
		})

	}

	loginUser(req, res) {
		User.findOne({ email: req.body.email }, (err, user) => {
			if(err) return res.status(500).send('Server Error')
			if(!user) return res.status(400).send('No User Found')

			const isValidPassword = bcrypt.compareSync(req.body.password, user.password)
			if(!isValidPassword) return res.status(401).send({auth: false, token: null})

			const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
				expiresIn: parseInt(process.env.TOKEN_EXPIRES, 10)
			})

			res.status(200).send({auth: true, token})
		})
	}

	logoutUser(req, res) {
		res.status(200).send({auth: false, token: null})
	}
}

module.exports = new AuthController()