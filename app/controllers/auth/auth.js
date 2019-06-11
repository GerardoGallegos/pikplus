'use strict'

const cyp = require('../../util/cyp')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const SECRET = 'Mega Secret key'

exports.authenticate = function (req, res) {
  User.findOne({
    username: req.body.username
  },

  (err, user) => {
    // ERR
    if (err) return res.status(500).send('Problemas con servidor')
    // NO USER
    if (!user) {
      res.status(401).json({ success: false, message: 'Authentication failed. User not found.' })
    }
    // OK USER
    if (user) {
      if (user.password !== cyp(req.body.password, req.body.username)) {
        // PASS INVALID
        res.status(401).json({
          success: false, message: 'Authentication failed. Pass Invalid'
        })
      } else if (user.password === cyp(req.body.password, req.body.username)) {
        // PASS OK
        const dataExposed = {
          name: user.name,
          permissions: user.permissions
        }
        const token = jwt.sign(dataExposed, SECRET, {
          expiresIn: 6000 // expires in 24 hours
        })

        res.status(200)
          .json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          })
      }
    }
  })
}

exports.checkAuth = function (permissions) {
  return function (req, res, next) {
    // Check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token']

    // Decode token
    if (token) {
      // Verifies secret and checks exp
      jwt.verify(token, SECRET, function (err, decoded) {
        if (err) {
          return res.status(401).json({ success: false, message: 'Failed to authenticate token.' })
        } else {
          console.log(permissions, decoded.permissions)
          console.log(hasAccess(permissions, decoded.permissions))
          if (hasAccess(permissions, decoded.permissions)) {
            // Has access
            console.log(permissions, decoded.permissions)
            req.decoded = decoded
            next()
          } else {
            // No access
            res.status(401).send({
              success: false,
              message: 'No tienes permiso para entrar a esta area'
            })
          }
        }
      })
    } else {
      // if there is no token
      // return an error
      return res.status(401).send({
        success: false,
        message: 'No token provided.'
      })
    }
  }

  function hasAccess (arrayConfig, objectToken) {
    let authorized = false

    arrayConfig.forEach((permiso) => {
      for (const key in objectToken) {
        if (permiso === key && objectToken[key] === true || objectToken[key] === 'true') {
          authorized = true
        }
      }
    })

    return authorized
  }
}

// route middleware to verify a token
exports.checkToken = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token']

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).json({ success: false, message: 'Failed to authenticate token.' })
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded
        console.log(req.decoded)
        next()
      }
    })
  } else {
    // if there is no token
    // return an error
    return res.status(401).send({
      success: false,
      message: 'No token provided.'
    })
  }
}
