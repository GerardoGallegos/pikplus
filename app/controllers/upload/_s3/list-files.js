'use strict'

const fs = require('fs')
const Promise = require('bluebird')

/*
  Este modulo lista los archivos de un folder

  @param[path] - {String} - Ruta de folder
  @return[Array] - Array con strings de las rutas de los folders

*/

function _listFiles (path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, filesArray) => {
      console.log('Error al listar los ficheros [listFiles]')
      if (err) reject(err)
      resolve(filesArray)
    })
  })
}

module.exports = _listFiles
