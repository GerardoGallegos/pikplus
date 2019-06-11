'use strict'

const uploadFiles = require('./upload-files')
const Promise = require('bluebird')
const configData = require('./data-config')

/*
  @param [proyectName] req.body.title;
  @param [files] req.files.files;
*/

function _compile (files, proyectName, workData) {
  return new Promise((resolve, reject) => {
    // Se suben los archivos a folder temporal _uploads
    uploadFiles(files, configData.rootFolder, proyectName, workData)
      .then((objFilesCompiled) => {
        resolve(objFilesCompiled)
      })
  })
}

module.exports = _compile
