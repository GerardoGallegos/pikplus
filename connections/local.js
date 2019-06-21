'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// Safe, constant-time comparison of strings.
const scmp = require('scmp')
const cyp = require('../util/cyp')

module.exports = function (User) {
  passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    session: false
  },
  (user, password, done) => {
    User.findOne({ userName: user }, (err, userFind) => {
      // Si hay error
      if (err) return done(err)
      // Si no hay usuario
      if (!userFind) { return done(null, false) }
      // Si hay usuario pero la contraseña es erronea
      if (!scmp(userFind.password, cyp(password, user))) { return done(null, false) }
      // Si todo es correcto
      if (scmp(userFind.password, cyp(password, user))) {
        // Expone los datos objeto con DATOS API EXPUESTA
        return done(null, { name: userFind.name, rol: userFind.rol })
      }
    })
  }
  ))
}
