'use strict'

const fs = require('fs'),
      Promise = require('bluebird');

/*
  Este modulo lista los archivos de un folder

  @param[path] - {String} - Ruta de folder
  @return[Array] - Array con strings de las rutas de los folders

*/

function _listFiles (path) {
  return new Promise((done, reject) => {
    fs.readdir(path, (err, filesArray) => {
      if(err) reject({error : err, detail : 'Error al listar los ficheros [listFiles]'})
      done(filesArray)
    })
  })
}

module.exports = _listFiles