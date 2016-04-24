'use strict'

const uploadFiles = require('./upload-files'),
      Promise = require('bluebird'),
      configData = require('./data-config');

/*
  @param [proyectName] req.body.title;
  @param [files] req.files.files;
*/

function _compile (files, proyectName, workData) {
  return new Promise((done, reject) => {
    //Se suben los archivos a folder temporal _uploads
    uploadFiles(files, configData.rootFolder, proyectName, workData)
    .then((objFilesCompiled) => {
        done(objFilesCompiled)
    })
  })
}

module.exports = _compile
