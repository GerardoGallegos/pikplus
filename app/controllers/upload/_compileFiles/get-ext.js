'use strict'

function getExt (name) {
  const cleanName = name.substr(-4)
  return cleanName.substring(cleanName.search(/\./g) + 1, cleanName.length)
}

module.exports = getExt
