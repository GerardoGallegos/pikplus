'use strict'

const fs = require('fs'),
      Promise = require('bluebird'),
      createFolder = require('./create-folder'),
      zipFolder = require('./zip-folder'),
      each = require('async-each'),
      populatePath = require('./populate-path'),
      deleteFolder = require('./delete-folder');

/*

  Este modulo realiza comprecion de folders

  @param[rootFolder] - {String} - Ruta raiz para almacenamiento de archivos
  @param[proyectName] -{String} - Nombre del proyecto

  @return[Promise]
*/


function zipFolders (rootFolder, proyectName) {

  return new Promise((done, reject) => {

    let _rf = populatePath(rootFolder, proyectName);

    // Crea el folder proyecName/_premium
    createFolder(_rf + '_premium/')

    // Crea el folder proyecName/_premium
    .then(() => {
      return createFolder(_rf + '_standard/')
    })

    // Genera el array de folders standard
    .then(() => {
      return getFoldersArray(_rf + 'standard/')
    })

    // Genera comprecion a folders _standard
    .then((foldersArray) => {
      return _zipFolders(foldersArray, _rf, 'standard/')
    })

    // Genera el array de folders premium
    .then((foldersArray) => {
      return getFoldersArray(_rf + 'premium/')
    })

    // Genera comprecion a folders _premium
    .then((foldersArray) => {
      return _zipFolders(foldersArray, _rf, 'premium/')
    })

    // Elimina foder temporal standard
    .then(() => {
      return deleteFolder(_rf + 'standard/');
    })

    // Elimina foder temporal premium
    .then(() => {
      return deleteFolder(_rf + 'premium/');
    })

    // Elimina foder temporal _temp
    .then(() => {
      return deleteFolder(_rf + '_temp/');
    })

    // Obtiene el Objeto con estructura y ruta de los folders compilados
    .then(() => {
      done(getFoldersCompiled(rootFolder, proyectName))
    })

    // Manejo de errores
    .catch((err) => {
      console.log(err)
    })

  })

}




function _zipFolders (arrayFolders, rootFolder, fo) {
  return new Promise((done, reject) => {
    
    each(arrayFolders, (folderName, next) => {
        let pathOrigin = `${rootFolder}${fo}/${folderName}`;
        let pathSave =   `${rootFolder}_${fo}/${folderName}.zip`;

        zipFolder(pathOrigin, pathSave).then(() => {
          next();
        })
      },
      // Callback
      (err) => {
        if(err) reject({ error : err, detail : 'Error al zipear folders, modulo zip-folders'})
        done()
      }
    )
  })
}


function getFoldersArray (path) {
  return new Promise((done, reject) => {
    fs.readdir(path, (err, data) => {
      if(err) reject(err)
      done(data)
    })
  })
}



function getFoldersCompiled (rootFolder, proyectName) {

  let _rootFolder = populatePath(rootFolder, proyectName)

  let scalof = {
    public : _rootFolder + 'public/',
    standard : _rootFolder + '_standard/',
    premium : _rootFolder + '_premium/'
  }

  return scalof

}



module.exports = zipFolders