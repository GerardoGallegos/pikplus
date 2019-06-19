
'use strict'

// Config env variables .env
require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
const morgan = require('morgan')
const methodOverride = require('method-override')
const swig = require('swig')
const multiparty = require('connect-multiparty')
const API = require('./app/controllers/api')

const multipartyMiddleware = multiparty()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '5mb' }))
// Handle request DELETE-PUT
app.use(methodOverride())
// Parse multiparte
app.use(multipartyMiddleware)
// Enable estaticos
app.use(express.static('./public'))
// Config swig
app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, '/app/views'))
app.use(API)

// Sockets management
require('./app/connections/sockets')(io)

http.listen(process.env.PORT, () => {
  console.log(
    'Node server running on http://localhost:' + process.env.PORT
  )
})
