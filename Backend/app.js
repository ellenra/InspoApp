const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
const app = express()
const usersRouter = require('./controllers/users')
const picturesRouter = require('./controllers/pictures')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)

app.use(express.json())
app.use(cors())
app.use('/api/users', usersRouter)
app.use('/api/pictures', picturesRouter)
app.use('/api/login', loginRouter)

module.exports = app