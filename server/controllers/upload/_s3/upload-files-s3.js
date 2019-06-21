'use strict'

const fs = require('fs')
const AWS = require('aws-sdk')
const Promise = require('bluebird')
const each = require('async-each')
const event = require('../../../util/events')

const listFiles = require('./list-files')
const uglyUrl = require('./ugly-url')
const getFileType = require('./get-file-type')
const saveLocation = require('./save-location-src')

AWS.config.accessKeyId = process.env.AWS_KEY
AWS.config.secretAccessKey = process.env.AWS_SECRET

var s3 = new AWS.S3()
var SRC = {
  public: { es: {}, en: {} },
  standard: {},
  premium: {}
}

const ERR = {
  S3: {
    listBuckets: 'Error al listar buckets S3 [prepareBucket]',
    createBucket: 'Error al crear el bucket[s3.createBucket]',
    createMultipart: 'Error al crear Multipart @function[s3.createMultipartUpload]',
    uploadFileS3: 'Error al subir archivo a S3',
    uploadFilesS3: 'Error al subir archivos a S3 [uploadFilesS3]'
  }
}

/*
 Este modulo se encarga de el manejo de solicitudes PUT para AWS S3

 @param[routesFiles] {Object} - Objeto con rutas compiladas de los archivos
 @param[bucketName] {String} - Nombre de el bucket req.body.bucket
 @param[proyectName] {String} - Nombre del proyecto req.body.url_en
*/

function _main (routesFiles, bucketName, proyectName) {
  return new Promise((resolve, reject) => {
    // PREPARE BUCKET
    event.emit('socket log', 'Prepare Bucket')
    prepareBucket(bucketName)

    // PUBLIC
      .then((message) => {
        event.emit('socket log completed', 'Prepare Bucket')
        return listFiles(routesFiles.public)
      })
      .then((arrayFiles) => {
        event.emit('socket log', 'Upload Files PUBLIC AWS S3')
        return uploadFilesS3(arrayFiles, routesFiles.public, bucketName, 'public', proyectName)
      })

    // STANDARD
      .then(() => {
        event.emit('socket log completed', 'Upload Files PUBLIC AWS S3')
        return listFiles(routesFiles.standard)
      })
      .then((arrayFiles) => {
        event.emit('socket log', 'Upload Files STANDARD AWS S3')
        return uploadFilesS3(arrayFiles, routesFiles.standard, bucketName, 'standard', proyectName)
      })

    // PREMIUM
      .then(() => {
        event.emit('socket log completed', 'Upload Files STANDARD AWS S3')
        return listFiles(routesFiles.premium)
      })
      .then((arrayFiles) => {
        event.emit('socket log', 'Upload Files PREMIUM AWS S3')
        return uploadFilesS3(arrayFiles, routesFiles.premium, bucketName, 'premium', proyectName)
      })

      .then((src) => {
        event.emit('socket log completed', 'Upload Files PREMIUM AWS S3')
        resolve(src)
      })

      .catch((err) => {
        event.emit('socket log', 'ERROR!!')
        console.log(err)
      })
  })
}

function uploadFilesS3 (arrayFiles, routeFile, bucket, mode, proyectName) {
  return new Promise((resolve, reject) => {
    each(arrayFiles, (fileName, next) => {
      const pathFile = routeFile + fileName

      // PRIVATE
      if (mode === 'standard' || mode === 'premium') {
        const _filenameEncyp = uglyUrl(fileName, 'psd').substring(0, 1000)

        event.emit('socket log', `_ Upload File ${fileName} [ ${mode} ] AWS S3`)
        uploadFile(_filenameEncyp, pathFile, bucket)
          .then((location) => {
            saveLocation(fileName, location, SRC, mode)
            event.emit('socket log completed', `_ Upload File ${fileName} [ ${mode} ] AWS S3`)
            next()
          })
      }

      // PUBLIC
      if (mode === 'public') {
        const _filenameES = proyectName.es + '-' + getFileType(fileName)
        const _filenameEN = proyectName.en + '-' + getFileType(fileName)

        event.emit('socket log', `_ Upload File ${fileName} [ ESPANOL PUBLIC ] AWS S3`)
        // ESPAÑOL
        uploadFile(_filenameES, pathFile, bucket)
          .then((location) => {
            event.emit('socket log completed', `_ Upload File ${fileName} [ ESPANOL PUBLIC ] AWS S3`)
            return saveLocation(fileName, location, SRC, mode, 'es')
          })
        // ENGLISH
          .then(() => {
            event.emit('socket log', `_ Upload File ${fileName} [ ENGLISH PUBLIC ] AWS S3`)
            return uploadFile(_filenameEN, pathFile, bucket)
          })

          .then((location) => {
            event.emit('socket log completed', `_ Upload File ${fileName} [ ENGLISH PUBLIC ] AWS S3`)
            saveLocation(fileName, location, SRC, mode, 'en')
            next()
          })
      }
    },
    // Callback
    (err) => {
      if (err) reject({ error: err, detail: ERR.S3.uploadFilesS3 })
      resolve(SRC)
    })
  })
}

function prepareBucket (bucketName) {
  return new Promise((resolve, reject) => {
    s3.listBuckets((err, data) => {
      console.log(ERR.S3.listBuckets)

      if (err) reject(err)
      // successful response
      for (let i = 0; i < data.Buckets.length; i++) {
        if (data.Buckets[i].Name === bucketName) {
          resolve('Bucket Existente:: ' + bucketName)
          i = data.Buckets.length // detiene bucle
        } else if (i == data.Buckets.length - 1 && data.Buckets[i].Name != bucketName) {
          s3.createBucket({ Bucket: bucketName }, (err, data) => {
            console.log(ERR.S3.createBucket )
            if (err) reject(err)
            resolve('No existia, Bucket fue creado:: ' + bucketName)
          })
        }
      }
    })
  })
}

function createMultipart (bucketName) {
  return new Promise((resolve, reject) => {
    s3.createMultipartUpload({
      Bucket: bucketName,
      Key: 'STRING_VALUE_GERARDO_GALLEGOS'

    }, (err, data) => {
      console.log(ERR.S3.createMultipart)
      if (err) reject(err)
      resolve('MultipartUpload Creada Exitosamente!')
    })
  })
}

function uploadFile (fileName, filePath, bucketName) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath)
    s3.upload({
      Bucket: bucketName,
      Key: fileName,
      Body: stream,
      ACL: 'public-read' // private  public-read

    }, (err, docs) => {
      if (err) {
        console.log(ERR.S3.uploadFileS3)
        reject(err)
      }
      resolve(docs.Location)
    })
  })
}

function getObject (bucketName, objectName) {
  return new Promise((resolve, reject) => {
    s3.getObject({ Bucket: bucketName, Key: objectName }, (err, data) => {
      console.log('Error al descargar objeto de S3[getObjectS3]')
      if (err) reject(err)
      // do something with data.body
      resolve(data)
    }
    )
  })
}

module.exports = _main
