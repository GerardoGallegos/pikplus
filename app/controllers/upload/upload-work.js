'use strict'

const compileFiles = require('./_compileFiles/compileFiles'),
    request = require('request'),
    preSaveWork = require('./_db/pre-save-work'),
    uploadFilesS3 = require('./_s3/upload-files-s3'),
    saveWork = require('./_db/db-work'),
    saveBucket = require('./_db/db-bucket'),
    saveTags = require('./_db/db-tags'),
    saveGroup = require('./_db/db-group'),
    event = require('../../util/events'),
    Models = require('../../models/allModels');

/* 
 *
 *
 *   Compila todo el trabajo emite eventos por Socket.io
 *
 *****************************************************************/

function uploadWork (req, res) {
    let _workData;

    event.emit('socket log', 'Work Pre-Almacenado en DB');

    // Se PRE GUARDA INFO DE WORK EN DB
    preSaveWork(req.body, Models)
    .then((workData) => {
      _workData = workData
      res.json(_workData)
      event.emit('socket log completed', 'Work Pre-Almacenado en DB');
      // Se suben y compilan los archivos
      event.emit('socket log', 'Archivos compilados .zip');
      return compileFiles(req.files.files, req.body.url_en, _workData)
    })


    // Se suben todos los compilados a S3
    .then((obj_filesComp) => {
      event.emit('socket log completed', 'Archivos compilados .zip')
      let bucket = req.body.bucket + 'cdn-pikplus',
          proyectNames = { 
            es : req.body.url_es, 
            en : req.body.url_en 
          }

      return uploadFilesS3(obj_filesComp, bucket, proyectNames)
    })

    // Se guarda la informacion de la base de datos
    .then((temp_src) => {
      event.emit('socket log', 'Guadado en DB Works [|]')
      return saveWork(req.body, Models, temp_src, _workData)
    })

    // Se guarda informacion de bucket en BD
    .then((temp_src) => {
      event.emit('socket log completed', 'Guadado en DB Works [|]')
      event.emit('socket log', 'Guadado en DB Bucket [|]')
      return saveBucket(req.body, Models, temp_src)
    })

    // Se guarda informacion de Tags en BD
    .then((temp_src) => {
      event.emit('socket log completed', 'Guadado en DB Bucket [|]')
      event.emit('socket log', 'Guadado en DB Group [|]')
      return saveTags(req.body, Models, temp_src)
    })

    // Se guarda informacion de Tags en BD
    .then((temp_src) => {
      event.emit('socket log completed', 'Guadado en DB Group [|]')
      return saveGroup(req.body, Models, temp_src)
    })

    .then(() => {
      event.emit('socket log finish', 'ok')
    })

    .catch((err) => {
      event.emit('socket log', 'ERROR ::> ' + err.detail);
      console.log(err)
    })
}

module.exports = uploadWork