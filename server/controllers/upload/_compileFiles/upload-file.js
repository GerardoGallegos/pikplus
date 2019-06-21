'use strict'

const fs = require('fs')
const Promise = require('bluebird')

/*  Sube los archivos
*/

function uploadFile (filePath, savePath) {
  return new Promise((resolve, reject) => {
    fs.rename(filePath, savePath, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

module.exports = uploadFile
