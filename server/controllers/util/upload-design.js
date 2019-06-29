const shortid = require('shortid')
const mime = require('mime')
const del = require('delete')
const mkdirp = require('mkdirp')
const resizeImage = require('./resize-image')
const uploadFile = require('./push-s3')
const { getPaletteFromURL } = require('color-thief-node')

// Ensure upload directory exists
const uploadDir = './uploads'
mkdirp.sync(uploadDir)

const uploadDesign = async (req, sizes = [50, 150, 200]) => {
  const { name: filename, mimetype } = await req.files.image
  return new Promise((resolve, reject) => {
    // Image's metadata
    const ext = '.' + mime.getExtension(mimetype)
    const id = shortid.generate()
    const pathTemp = `${uploadDir}/${id}`

    // Upload image to temp dir
    req.files.image.mv(pathTemp, async (error) => {
      if (error) {
        console.log(error)
        throw error
      }

      // Resize the image
      const imagesTmp = await Promise.all(sizes.map(async size =>
        resizeImage({
          pathTemp,
          ext,
          size,
          mimetype,
          filename
        })
      ))

      const colorsRGB = await getPaletteFromURL(imagesTmp[2].filePath)

      const locations = {}

      // Upload each image so AWS S3 and get the location
      await Promise.all(imagesTmp.map(async file => {
        const location = await uploadFile(file)
        locations[file.suffix] = location
      }))

      // Eliminar imagenes temporales
      await del(pathTemp)
      await del(imagesTmp.map(f => f.filePath))

      resolve({ locations, colorsRGB })
    })
  })
}

module.exports = uploadDesign
