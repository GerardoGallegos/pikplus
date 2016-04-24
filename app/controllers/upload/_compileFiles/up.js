'use strict';

const fs = require('fs'),
    Promise = require('bluebird'),
    mkdirp = require('mkdirp'),
    each = require('async-each'),
    resizeImage = require('./resize-image'),
    licenceStandard = require('./licence-pdf'),
    licencePremium = require('./create-licence-premium'),
    copyFile = require('./copy-file'),
    createFolder = require('./create-folder'),
    populatePath = require('./populate-path'),
    zipFolders = require('./zip-folders'),
    getProcess = require('./get-process');

/*
  Este modulo recorre la configuracion y va procesando la configuracion de cada proceso
  
  @param[files] - Objeto con rutas de archivos subidos a _temp
  @param[rootFolder] - Nombre de ruta raiz de el folder a subir
  @param[configArray - Objeto con configData.folders
  @param[proyectName] - Nombre de proyecto de req.body.name_en
  @return[Promise]

*/


module.exports = function (files, rootFolder, configArray, proyectName, workData) {
  return new Promise ((done, reject) => {    
    each(configArray, (file, next) => {
        //Ruta final para almacenamiento de archivo
        let path = populatePath(rootFolder + file.path, proyectName);

        createFolder(path)
        .then(() => {
          process(files, path, file.files, proyectName, workData, next);
        })
      },
      // Callback
      (err) => {
        // Realiza la comprecion de los folders
        zipFolders(populatePath(rootFolder, proyectName))
        .then((objFilesCompiled) => {
          done(objFilesCompiled);
        })
      }
    )
  })
}


/*
  @method [process] - Este metodo procesa la informacion y va dando instrucciones de que hacer con el archivo de configuracion

  @param[filesData] - Objeto con rutas de archivos subidos a _temp
  @param[path] - Ruta para almacenamiento de archivos
  @param[filesObj] - Array con objetos de archivos  ejemplo:
        {
          type: '.png',
          process: '[RESIZE_IMG:500]',
          name: '****_preview.png'
        }
  @param[proyectName] - Nombre de proyecto
  @param[next] - Metodo para iteracion asincrona 
  @param workData - Objeto con Informacion de Work de DB pre-save

*/


function process (filesData, path, filesObj, proyectName, workData, next) {

  each(filesObj, (file, next) => {
      
      let p = getProcess(file.process);
      
      switch (p.comand) {

        case 'RESIZE_IMG':
          resizeImage(filesData.png.path, p.param, path + populatePath(file.name, proyectName))
          .then(() => {
            next()
          });

        break;
      
        case 'UPLOAD_FILE':
          let fileType = _cleanDots(file.type),
              originalPath = filesData[fileType].path,
              pathToUpload = `${path}${proyectName}.${fileType}`;
              
            //console.log(pathToUpload)
          copyFile(originalPath, pathToUpload)
          .then(() => {
            next()
          })
        break;

        case 'CREATE_LICENCE':
          let imgTemp = path + populatePath('****_preview.png', proyectName)
          setTimeout(() => {
            if(p.param === 'STANDARD') {
              licenceStandard (proyectName, path, imgTemp)
              .then(() => {
                //console.log('Standard')
                next();
              })
            }
            else if(p.param === 'PREMIUM') {
              licencePremium (proyectName, path, imgTemp, workData)
              .then(() => {
                next();
              })
            }
            
          },6000)
          break;

      }


    },
    // Callback
    (err) => {
      next()
    }
  )
}


function _cleanDots (str) {
  return str.replace(/\./g, '');
}
