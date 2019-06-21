'use strict'

const mkdirp = require('mkdirp')
const Promise = require('bluebird')

function createFolder (path) {
  return new Promise((resolve, reject) => {
    mkdirp(path, (err) => {
      const error = new Error(`Error al crear el Folder mkdirp ${path}`)
      error.error = err

      if (err) reject(error)
      resolve('Folders creados::> ' + path)
    })
  })
}

module.exports = createFolder
