const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./api/routes')
const app = express()
const port = process.env.PORT || 3000

// Model
require('./api/models/User')
require('./api/models/Task')

// Environment Configuration
require('dotenv').config()


if(process.env.CORS_ENABLE) {
	app.use(cors())
	console.log('CORS is enabled for Express Server') //eslint-disable-line
}

// mongoose instance connection url
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)

app.use(bodyParser.urlencoded({ extend: true }))
app.use(bodyParser.json())

routes(app)

const listener = app.listen(port, () => {
	console.log(`Express Server Listening to Port ${listener.address().port}`) //eslint-disable-line
})