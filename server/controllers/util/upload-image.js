/*
 * 1) upload image to _TEMP
 * 2) redimention si es bitmap
 * 3) upload images to S3
 * 4) remove temp images fron /upload
 */

const mkdirp = require('mkdirp')
const del = require('delete')
const mime = require('mime')
const shortid = require('shortid')
const storeFileTemp = require('./storeFileTemp')
const resizeImg = require('./resizeImage')
const uploadFile = require('./upload-s3')

// Ensure upload directory exists
const uploadDir = './uploads'
mkdirp.sync(uploadDir)

module.exports = async (file, sizes, folderS3, endName, endExt) => {
  // Subir imagen a folder temporal y guardar su locacion
  const { name, mimetype } = await file
  const ext = '.' + mime.getExtension(mimetype)
  const id = shortid.generate()
  const pathTemp = `${uploadDir}/${id}`

  // const pathTemp = uploadDir + '/' + id + '.' + ext
  // const { pathTemp, ext } = await storeFileTemp({ stream, filename: name.split('.').slice(0, -1).join('.') })

  await storeFileTemp({ file, pathTemp })

  const output = {}

  // Si es bitmap redimencionar
  if (ext !== '.svg') {
    const imagesTmp = await Promise.all(sizes.map(async file =>
      resizeImg({ pathTemp, ext, filename: name.split('.').slice(0, -1).join('.'), mimetype, endExt, ...file })
    ))

    // Subir imagenes y conservar location
    await Promise.all(imagesTmp.map(async file => {
      const location = await uploadFile({ ...file, folderS3, endName })
      output[file.suffix] = location
    }))

    // Eliminar imagenes temporales
    await del(pathTemp)
    await del(imagesTmp.map(f => f.filePath))

    return output
  }

  // Si es imagen SVG
  if (ext === '.svg') {
    const location = await uploadFile({
      folderS3,
      filePath: pathTemp,
      filename: name,
      ext,
      suffix: 'vector',
      mimetype: mimetype,
      endName
    })

    sizes.forEach(file => {
      output[file.suffix] = location
    })

    // Eliminar imagenes temporales
    await del(pathTemp)
    return output
  }
}
