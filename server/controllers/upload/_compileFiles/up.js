'use strict'

const Promise = require('bluebird')
const each = require('async-each')
const resizeImage = require('./resize-image')
const licenceStandard = require('./licence-pdf')
const licencePremium = require('./create-licence-premium')
const copyFile = require('./copy-file')
const createFolder = require('./create-folder')
const populatePath = require('./populate-path')
const zipFolders = require('./zip-folders')
const getProcess = require('./get-process')

/*
  Este modulo recorre la configuracion y va procesando la configuracion de cada proceso

  @param[files] - Objeto con rutas de archivos subidos a _temp
  @param[rootFolder] - Nombre de ruta raiz de el folder a subir
  @param[configArray - Objeto con configData.folders
  @param[proyectName] - Nombre de proyecto de req.body.name_en
  @return[Promise]

*/

module.exports = function (files, rootFolder, configArray, proyectName, workData) {
  return new Promise((resolve, reject) => {
    each(configArray, (file, next) => {
      // Ruta final para almacenamiento de archivo
      const path = populatePath(rootFolder + file.path, proyectName)

      createFolder(path)
        .then(() => {
          process(files, path, file.files, proyectName, workData, next)
        })
    },
    // Callback
    (err) => {
      if (err) {
        throw (err)
      }
      // Realiza la comprecion de los folders
      zipFolders(populatePath(rootFolder, proyectName))
        .then((objFilesCompiled) => {
          resolve(objFilesCompiled)
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
    const p = getProcess(file.process)
    const fileType = _cleanDots(file.type)
    const originalPath = filesData[fileType].path
    const pathToUpload = `${path}${proyectName}.${fileType}`
    const imgTemp = path + populatePath('****_preview.png', proyectName)

    switch (p.comand) {
      case 'RESIZE_IMG':
        resizeImage(filesData.png.path, p.param, path + populatePath(file.name, proyectName))
          .then(() => {
            next()
          })

        break

      case 'UPLOAD_FILE':
        // console.log(pathToUpload)
        copyFile(originalPath, pathToUpload)
          .then(() => {
            next()
          })
        break

      case 'CREATE_LICENCE':
        setTimeout(() => {
          if (p.param === 'STANDARD') {
            licenceStandard(proyectName, path, imgTemp)
              .then(() => {
                // console.log('Standard')
                next()
              })
          } else if (p.param === 'PREMIUM') {
            licencePremium(proyectName, path, imgTemp, workData)
              .then(() => {
                next()
              })
          }
        }, 6000)
        break
    }
  },
  (err) => {
    if (err) {
      throw (err)
    }
    next()
  }
  )
}

function _cleanDots (str) {
  return str.replace(/\./g, '')
}
