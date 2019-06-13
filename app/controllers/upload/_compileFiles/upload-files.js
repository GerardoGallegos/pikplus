'use strict'

const Promise = require('bluebird')
const each = require('async-each')
const populatePath = require('./populate-path')
const uploadFile = require('./upload-file')
const getExt = require('./get-ext')
const createFolder = require('./create-folder')
const up = require('./up')
const configData = require('./data-config')

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
  console.log(filesArray)
  return new Promise((resolve, reject) => {
    var FilesData = {}

    if (!Array.isArray(filesArray)) {
      filesArray = [filesArray]
    }

    each(filesArray, (file, next) => {
      const savePath = `${populatePath(rootFolder, proyectName)}_temp/`
      const fileName = `${proyectName}.${getExt(file.originalFilename)}`
      const savePathFile = `${savePath}${fileName}`

      // Crea la estructura de folders
      createFolder(savePath)

      // Sube el archivo
        .then(() => {
          return uploadFile(file.path, savePathFile)
        })

      // Se almacena informacion en objeto fileData
        .then(() => {
          fileData(file, FilesData, savePathFile, next)
        })
    }, (err) => {
      if (err) reject(err)

      // Archivos subidos exitosamente
      // Procesamiento de Archivos
      up(FilesData, configData.rootFolder, configData.folders, proyectName, workData)
        .then((objFilesCompiled) => {
          resolve(objFilesCompiled)
        })
    }
    )
  })
}

function fileData (file, FilesData, Path, next) {
  const fileExt = getExt(file.name)

  if (fileExt === 'png' || fileExt === 'jpg') {
    FilesData.png = {
      name: file.name,
      path: Path
    }
    next()
  }

  if (fileExt === 'ai') {
    FilesData.ai = {
      name: file.name,
      path: Path
    }
    next()
  }

  if (fileExt === 'eps') {
    FilesData.eps = {
      name: file.name,
      path: Path
    }
    next()
  }

  if (fileExt === 'psd') {
    FilesData.psd = {
      name: file.name,
      path: Path
    }
    next()
  }
}
