'use strict';

const Promise = require('bluebird'),
    each = require('async-each'),
    populatePath = require('./populate-path'),
    uploadFile = require('./upload-file'),
    getExt = require('./get-ext'),
    createFolder = require('./create-folder'),
    up = require('./up'),
    configData = require('./data-config');


/*
  Este modulo se encarga de subir los archivos a la carpeta temporal _temp
  cuando se cumple la promesa retorna Objeto con informacion de las rutas de 
  los archivos recien subidos
  
  @param[filesArray] - Objeto con archivos de req.files.files
  @param[rootFolder] - Nombre de ruta raiz de el folder a subir
  @param[proyectName] - Nombre del proyecto, viene desde el cliente
  @return[Promise]

*/

module.exports = function (filesArray, rootFolder, proyectName, workData) { //, next

  return new Promise ((done, reject) => {
    
    var FilesData = {}

    each(filesArray, (file, next) => {
          let savePath =  `${populatePath(rootFolder, proyectName)}_temp/`,
              fileName =  `${proyectName}.${getExt(file.originalFilename)}`,
              savePathFile = `${savePath}${fileName}`;

          // Crea la estructura de folders
          createFolder(savePath)

          // Sube el archivo
          .then(() => {
            return uploadFile (file.path, savePathFile)
          })

          // Se almacena informacion en objeto fileData
          .then(() => {
            fileData(file, FilesData, savePathFile, next)
          })
        }, (err) => {
          if(err) reject(err)
            
          // Archivos subidos exitosamente
          // Procesamiento de Archivos
          up(FilesData, configData.rootFolder, configData.folders, proyectName, workData)
          .then((objFilesCompiled) => {
            done(objFilesCompiled)
          })
        }
    )
  })
}



function fileData (file, FilesData, Path, next) {

  let fileExt = getExt(file.name)

  if (fileExt === 'png' || fileExt === 'jpg') {
    FilesData.png = {
      name: file.name,
      path: Path
    }
    next();
  }

  if (fileExt === 'ai') {
    FilesData.ai = {
      name: file.name,
      path: Path
    }
    next();
  }

  if (fileExt === 'eps') {
    FilesData.eps = {
      name: file.name,
      path: Path
    }
    next();
  }

  if (fileExt === 'psd') {
    FilesData.psd = {
      name: file.name,
      path: Path
    }
    next();
  }

}
