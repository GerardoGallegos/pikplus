'use strict'

const express = require('express')
const auth = require('./auth/auth')

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
api.route('/user/:id')
  .get()
  .put()
  .post()
  .delete()

// Designs
api.route('/desings')
  .get()

// Design
api.route('/design/:id')
  .get()
  .put()
  .post()

module.exports = api
