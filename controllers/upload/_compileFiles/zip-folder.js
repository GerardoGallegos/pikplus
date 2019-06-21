'use strict'

const Promise = require('bluebird')
const zipFolder = require('zip-folder')

function _zipFolder (pathOrigin, pathSave) {
  return new Promise((resolve, reject) => {
    zipFolder(pathOrigin, pathSave, (err) => {
      console.log('Error al tratar de comprimir ZIP folder: ' + pathSave)
      if (err) reject(err)
      resolve()
    })
  })
}

module.exports = _zipFolder
