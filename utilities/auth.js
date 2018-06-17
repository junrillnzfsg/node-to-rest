const jwt = require('jsonwebtoken')

const tokenStripBearer  = (token) => {
	if(token.indexOf('Bearer') !== -1) {
		return token.replace('Bearer ', '')
	}
	return token
}

const verifyToken = (req, res, next) => {
	const authorizationToken = req.headers.authorization
	if(!authorizationToken) return res.status(401).send({ auth: false, message: 'JWT Token is required' })
	const token = tokenStripBearer(authorizationToken)
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if(err) return res.status(500).send({auth: false, message: 'Authentication Failed'})
		req.userId = decoded.id
		next()
	})
}

module.exports = {
	tokenStripBearer,
	verifyToken
}