'use strict'

const express = require('express')
const auth = require('./auth/auth')
const user = require('./user/user-controller')

// Get an instance of the router for api routes
const api = express.Router()

api.get('/', (req, res) => {
  res.json({
    api: 'pikplus API',
    version: 1
  })
})

// Authentification
api
  .post('/api/auth', auth.authenticate)
  .post('/api/signup', auth.signup)

// Users
api.route('/api/user/:id')
  .get(user.get)
  .put(user.put)
  .delete(user.delete)

// Designs
api.route('/api/desings')
  .get()

// Design
api.route('/api/design/:id')
  .get()
  .put()
  .post()

module.exports = api
