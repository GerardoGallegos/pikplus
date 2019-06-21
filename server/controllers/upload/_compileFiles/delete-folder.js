'use strict'

const Promise = require('bluebird')
const del = require('delete')

function _deleteFolder (path) {
  return new Promise((resolve, reject) => {
    del([path], (err) => {
      const error = new Error('Error al eliminar folder modulo[delete-folder]')
      if (err) reject(error)
      resolve()
    })
  })
}

module.exports = _deleteFolder
