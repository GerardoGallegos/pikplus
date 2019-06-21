'use strict'

const compileFiles = require('./_compileFiles/compileFiles')
const preSaveWork = require('./_db/pre-save-work')
const uploadFilesS3 = require('./_s3/upload-files-s3')
const saveWork = require('./_db/db-work')
const saveBucket = require('./_db/db-bucket')
const saveTags = require('./_db/db-tags')
const saveGroup = require('./_db/db-group')
const event = require('../../util/events')
const Models = require('../../models')

/*
 *
 *
 *   Compila todo el trabajo emite eventos por Socket.io
 *
 *****************************************************************/

function uploadWork (req, res) {
  let _workData

  event.emit('socket log', 'Work Pre-Almacenado en DB')

  // Se pre-guarda WORK EN DB
  preSaveWork(req.body, Models)
    .then((workData) => {
      _workData = workData
      res.json(_workData)
      event.emit('socket log completed', 'Work Pre-Almacenado en DB')
      // Se suben y compilan los archivos
      event.emit('socket log', 'Archivos compilados .zip')
      return compileFiles(req.files.files, req.body.url_en, _workData)
    })

    // Se suben todos los compilados a S3
    .then((objFilesComp) => {
      event.emit('socket log completed', 'Archivos compilados .zip')
      const bucket = req.body.bucket + 'cdn-pikplus'
      const proyectNames = {
        es: req.body.url_es,
        en: req.body.url_en
      }

      return uploadFilesS3(objFilesComp, bucket, proyectNames)
    })

    // Se guarda la informacion de la base de datos
    .then((tempSrc) => {
      event.emit('socket log', 'Guadado en DB Works [|]')
      return saveWork(req.body, Models, tempSrc, _workData)
    })

    // Se guarda informacion de bucket en BD
    .then((tempSrc) => {
      event.emit('socket log completed', 'Guadado en DB Works [|]')
      event.emit('socket log', 'Guadado en DB Bucket [|]')
      return saveBucket(req.body, Models, tempSrc)
    })

    // Se guarda informacion de Tags en BD
    .then((tempSrc) => {
      event.emit('socket log completed', 'Guadado en DB Bucket [|]')
      event.emit('socket log', 'Guadado en DB Group [|]')
      return saveTags(req.body, Models, tempSrc)
    })

    // Se guarda informacion de Tags en BD
    .then((tempSrc) => {
      event.emit('socket log completed', 'Guadado en DB Group [|]')
      return saveGroup(req.body, Models, tempSrc)
    })

    .then(() => {
      event.emit('socket log finish', 'ok')
    })

    .catch((err) => {
      event.emit('socket log', 'ERROR ::> ' + err.detail)
      console.log(err)
    })
}

module.exports = uploadWork
