
'use strict'

// Config env var .env
require('dotenv').config()

// Connection MongoDB
require('./connections/DB')

const express = require('express')
const path = require('path')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
const morgan = require('morgan')
const methodOverride = require('method-override')
const multiparty = require('connect-multiparty')
const API = require('./controllers/api')

const multipartyMiddleware = multiparty()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '5mb' }))
app.use(methodOverride())
app.use(multipartyMiddleware)
app.use(express.static(path.join(__dirname, 'public')))
app.use(API)

// Sockets management
require('./connections/sockets')(io)

http.listen(process.env.PORT, () => {
  console.log(
    'Node server running on http://localhost:' + process.env.PORT
  )
})
