
'use strict'

// Configurando Variables de entorno en archivo .env
require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const swig = require('swig')
const multiparty = require('connect-multiparty')
const API = require('./app/controllers/api')

const multipartyMiddleware = multiparty()

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .catch((error) => {
    console.log('ERROR MONGO-DB::', error)
    throw error
  })

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '5mb' }))
// Manejar peticiones DELET-PUT
app.use(methodOverride())
// Parsear multiparte
app.use(multipartyMiddleware)
// Habilitar estaticos
app.use(express.static('./public'))
// Configuracion de swig
app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, '/app/views'))
app.use(API)

// Sockets management
require('./app/connections/sockets')(io)

http.listen(process.env.PORT, () => {
  console.log(
    'Node server running on http://localhost:::' + process.env.PORT
  )
})
