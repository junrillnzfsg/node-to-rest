const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required']
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		validate: {
			validator: (value) => {
				return /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(value)
			},
			message: '{VALUE} is not a valid email address'
		},
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Password is required']
	},
})

module.exports = mongoose.model('User', UserSchema)