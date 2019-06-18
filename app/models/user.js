'use strict'

// const DB = require('../connections/DB')(process.env.DB_USERS)
const mongoose = require('mongoose')
const { isEmail } = require('validator')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: [true, 'No puede estar es blanco'],
    validate: [isEmail, 'El email ingresado es invalido'],
    maxlength: [100, 'El email debe de tener maximo 100 caracteres'],
    index: true
  },
  name: { type: String, required: true },
  created: { type: Date, default: Date.now },
  role: { type: String, enum: ['member', 'admin'], default: 'member' },
  avatar: String,
  password: { type: String, required: true }
}, { timestamps: true })

UserSchema.plugin(uniqueValidator, { message: 'Ya esta esta en uso' })

UserSchema.pre('save', function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next()

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.checkPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, res) {
      if (err) return reject(err)
      resolve(res)
    })
  })
}

module.exports = mongoose.model('User', UserSchema)
