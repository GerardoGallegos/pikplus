const sha512_256 = require('js-sha512').sha512_256
const md5 = require('md5')

const str = '*as9d8a7(8726762'

function _level1 (urlName, tipo) {
  return sha512_256(md5(urlName) + tipo + tipo + urlName + str)
}

function _compileUgly (urlName, tipo) {
  return urlName + tipo + _level1(urlName, tipo)
}

module.exports = _compileUgly
