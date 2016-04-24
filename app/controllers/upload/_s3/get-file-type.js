/*
  Extrae el tipo de archip
    entra: 'algo_PNG.zip'
    sale: 'PNG'
*/

function _getFileType(fileName) {
  return fileName.substring(fileName.search('_') + 1, fileName.search(/\./g))
}

module.exports = _getFileType