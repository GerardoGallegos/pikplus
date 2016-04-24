'use strict'

const fs = require('fs'),
      Promise = require('bluebird');

/*  Sube los archivos
*/

function uploadFile (filePath, savePath) {
  return new Promise ((done, reject) => {
    fs.rename(filePath, savePath, (err) => {
      if(err) reject({error : err, detail : `Error al subir archivo: ${filePath}`});
      done()
    })
  })
}

module.exports = uploadFile;