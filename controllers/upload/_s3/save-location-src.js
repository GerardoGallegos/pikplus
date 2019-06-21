'use strict'

const  _getFileType = require('./get-file-type');

/*
  Guarda la ruta s3 en el objeto SRC

  @param[fileName] - {String} - Nombre de archivo ejemplo: 'bussines_PNG.zip'
  @param[location] - {String} - Ruta de almacenamiento en S3: 'https.z3.folder/file.zip'
  @param[SRC] -      {Object} - Objeto con la compilacion de las rutas "location"
  @param[mode] -     {String} - modo puede ser public, standard o premium
  @param[language] - {String} - es o en
*/

function _saveLocation (fileName, location, SRC, mode, language) {
  var type = _getFileType(fileName)

  if (mode === 'standard' || mode === 'premium') {
    switch (type) {

      case '2000':
        SRC[mode]['2000'] = location
        break

      case '5000':
        SRC[mode]['5000'] = location
        break
      
      case 'PSD':
        SRC[mode]['psd'] = location
        break

      case 'VECTOR':
        SRC[mode]['vector'] = location
        break 
    }
  }

  if (mode === 'public') {
    switch (type) {

      case 'big':
        SRC[mode][language]['big'] = location
        break

      case 'medium':
        SRC[mode][language]['medium'] = location
        break
      
      case 'small':
        SRC[mode][language]['small'] = location
        break

      case 'micro':
        SRC[mode][language]['micro'] = location
        break 

      case 'nano':
        SRC[mode][language]['nano'] = location
        break 
    }
  }


}


module.exports = _saveLocation