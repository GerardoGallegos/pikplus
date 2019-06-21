'use strict'

const fs = require('fs')
const Promise = require('bluebird')
const createFolder = require('./create-folder')
const zipFolder = require('./zip-folder')
const each = require('async-each')
const populatePath = require('./populate-path')
const deleteFolder = require('./delete-folder')

/*

  Este modulo realiza comprecion de folders

  @param[rootFolder] - {String} - Ruta raiz para almacenamiento de archivos
  @param[proyectName] -{String} - Nombre del proyecto

  @return[Promise]
*/

function zipFolders (rootFolder, proyectName) {
  return new Promise((resolve, reject) => {
    const _rf = populatePath(rootFolder, proyectName)

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
        return deleteFolder(_rf + 'standard/')
      })

    // Elimina foder temporal premium
      .then(() => {
        return deleteFolder(_rf + 'premium/')
      })

    // Elimina foder temporal _temp
      .then(() => {
        return deleteFolder(_rf + '_temp/')
      })

    // Obtiene el Objeto con estructura y ruta de los folders compilados
      .then(() => {
        resolve(getFoldersCompiled(rootFolder, proyectName))
      })

    // Manejo de errores
      .catch((err) => {
        console.log(err)
      })
  })
}

function _zipFolders (arrayFolders, rootFolder, fo) {
  return new Promise((resolve, reject) => {
    each(arrayFolders, (folderName, next) => {
      const pathOrigin = `${rootFolder}${fo}/${folderName}`
      const pathSave = `${rootFolder}_${fo}/${folderName}.zip`

      zipFolder(pathOrigin, pathSave).then(() => {
        next()
      })
    },
    // Callback
    (err) => {
      console.log('Error al zipear folders, modulo zip-folders')
      if (err) reject(err)
      resolve()
    }
    )
  })
}

function getFoldersArray (path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function getFoldersCompiled (rootFolder, proyectName) {
  const _rootFolder = populatePath(rootFolder, proyectName)

  const scalof = {
    public: _rootFolder + 'public/',
    standard: _rootFolder + '_standard/',
    premium: _rootFolder + '_premium/'
  }

  return scalof
}

module.exports = zipFolders
