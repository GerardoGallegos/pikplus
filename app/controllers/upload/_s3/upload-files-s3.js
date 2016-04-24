'use strict'

const fs = require('fs'),
    AWS = require('aws-sdk'),
    md5 = require('md5'),
    Promise = require("bluebird"),
    each = require('async-each'),
    event = require('../../../util/events'),

    listFiles = require('./list-files'),
    uglyUrl = require('./ugly-url'),   
    getFileType = require('./get-file-type'),
    saveLocation = require('./save-location-src');

    AWS.config.accessKeyId = process.env.AWS_KEY
    AWS.config.secretAccessKey = process.env.AWS_SECRET
    


var s3 = new AWS.S3();
var SRC = {
  public : { es : {}, en : {} },
  standard : {},
  premium : {}
};

const ERR = {
  S3 : {
      listBuckets :  'Error al listar buckets S3 [prepareBucket]',
      createBucket : 'Error al crear el bucket[s3.createBucket]',
      createMultipart : 'Error al crear Multipart @function[s3.createMultipartUpload]',
      uploadFileS3 : 'Error al subir archivo a S3',
      uploadFilesS3 : 'Error al subir archivos a S3 [uploadFilesS3]'
  }
}

/*
 Este modulo se encarga de el manejo de solicitudes PUT para AWS S3

 @param[routesFiles] {Object} - Objeto con rutas compiladas de los archivos
 @param[bucketName] {String} - Nombre de el bucket req.body.bucket
 @param[proyectName] {String} - Nombre del proyecto req.body.url_en
*/


function _main (routesFiles, bucketName, proyectName) {

  return new Promise((done, reject) => {

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
      event.emit('socket log', 'Upload Files STANDARD AWS S3');
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
      done(src)
    })

    .catch((err) => {
      event.emit('socket log', 'ERROR!!')
      console.log(err)
    })
  })
  
}



function uploadFilesS3 (arrayFiles, routeFile, bucket, mode, proyectName) {
  return new Promise((done, reject) => {
  
    each(arrayFiles, (fileName, next) => {
      let pathFile = routeFile + fileName
      
      // PRIVATE
      if(mode === 'standard' || mode === 'premium') {
        let _filenameEncyp = uglyUrl(fileName, 'psd').substring(0,1000) 

        event.emit('socket log', `_ Upload File ${fileName} [ ${mode} ] AWS S3`)
        uploadFile(_filenameEncyp, pathFile, bucket)
        .then((location) => {
          saveLocation(fileName, location, SRC, mode)
          event.emit('socket log completed', `_ Upload File ${fileName} [ ${mode} ] AWS S3`)
          next()
        })
      }

      // PUBLIC
      if(mode === 'public') {
        let _filenameES = proyectName.es + '-' + getFileType(fileName)
        let _filenameEN = proyectName.en + '-' + getFileType(fileName)

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
    //Callback
    (err) => {
      if(err) reject({error : err, detail : ERR.S3.uploadFilesS3})
      done(SRC)
    })
  })
}

function test() {
  debugger
  s3.listBuckets((err, data)=> {
    console.log(data)
  })
}


function prepareBucket (bucketName) {
  debugger
  return new Promise ((done, reject)=>{
    s3.listBuckets((err, data)=> {
      debugger
      console.log(data)

      if(err) reject({ error : err, detail : ERR.S3.listBuckets});
        // successful response
      for (let i = 0; i < data.Buckets.length; i++) {
          if(data.Buckets[i].Name == bucketName) {
            done('Bucket Existente:: ' + bucketName)
            i = data.Buckets.length; // detiene bucle
          }
          else if( i == data.Buckets.length-1 && data.Buckets[i].Name != bucketName ) {
            s3.createBucket({ Bucket : bucketName},(err, data)=> {
              if (err) reject({ error : err, detail :  ERR.S3.createBucket})
              done('No existia, Bucket fue creado:: ' + bucketName)
            })
          }
      }
    });
  });
}

function createMultipart (bucketName) {
  return new Promise((done, reject)=> {
    s3.createMultipartUpload({
      Bucket: bucketName,
      Key: 'STRING_VALUE_GERARDO_GALLEGOS'

    },(err, data)=> {
      if(err) reject({ error : err, detail : ERR.S3.createMultipart });
      done('MultipartUpload Creada Exitosamente!');
    }); 
  });
}

function uploadFile (fileName, filePath, bucketName) {
  return new Promise((done, reject) => {
    let stream = fs.createReadStream(filePath)
    s3.upload({
      Bucket : bucketName,
      Key : fileName,
      Body : stream,
      ACL: 'public-read' //private  public-read

    }, (err, docs) => {
      if (err) reject({ error : err, detail : ERR.S3.uploadFileS3 })
      done(docs.Location)
    })
  })
}



function getObject(bucketName, objectName) {
  return new Promise((done, reject) => {
    s3.getObject({ Bucket: bucketName, Key: objectName }, (err, data)=> {
        if (err) reject({ error : err, detail : 'Error al descargar objeto de S3[getObjectS3]'})
        // do something with data.body
        done(data)
      }
    )    
  })
}


module.exports = _main