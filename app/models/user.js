'use strict'

const DB = require('../connections/DB')(process.env.DB_USERS)
const mongoose = require('mongoose')

function User (collectionName) {
  // Esquema de Group

  const User = DB.model('USERS', new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    created: { type: Date, default: Date.now },
    permissions: {
      works: { type: Boolean, default: false },
      upload: { type: Boolean, default: false },
      statistics: { type: Boolean, default: false },
      users: { type: Boolean, default: false }
    },
    logs: [{
      log: String,
      user: String,
      date: { type: Date, default: Date.now }
    }],
    password: { type: String, required: true }
  }))

  // MODEL
  return User
}

module.exports = User()
