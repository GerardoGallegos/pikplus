'use strict'

const Promise = require('bluebird'),
      zipFolder = require('zip-folder');


function _zipFolder(pathOrigin, pathSave) {
  return new Promise((done, reject) => {
    zipFolder(pathOrigin, pathSave, (err) => {
      if(err) reject({ error : err, detail : 'Error al tratar de comprimir ZIP folder: ' + pathSave })
      done()
    })
  })
}

module.exports = _zipFolder