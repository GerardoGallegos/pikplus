const jwt = require('jsonwebtoken')
const moment = require('moment')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_SECRET_PASS = process.env.JWT_SECRET_PASS

const getToken = ({ _id, role }) => {
  const payload = {
    sub: _id,
    role
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1m' })
}

const getRefreshToken = ({ _id }) => {
  const payload = { sub: _id }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

// Aqui no exponemos el id del usuario en su lugar enviamos un hash
const getResetPasswordToken = (sub) => {
  return jwt.sign({
    sub
  }, JWT_SECRET_PASS, { expiresIn: '20m' })
}

const verifyResetPasswordToken = (token) => {
  try {
    const decode = jwt.verify(token, JWT_SECRET_PASS)
    return decode
  } catch (error) {
    if (error.message === 'jwt expired') {
      return 'jwt expired'
    }
    return 'invalid jwt'
  }
}

const getTokens = (user) => ({
  token: getToken(user),
  refreshToken: getRefreshToken(user)
})

const authMiddleware = (req, res, next) => {
  const jwtToken = req.headers.jwt
  const jwtRfs = req.headers.jwt_rfs

  console.log(jwtToken, jwtRfs)
  next()
}

module.exports = {
  getTokens,
  authMiddleware
}
