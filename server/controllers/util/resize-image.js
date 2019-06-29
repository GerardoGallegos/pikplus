const gm = require('gm')
  .subClass({
    imageMagick: process.env.NODE_ENV === 'production'
  })

// filename es el nombre original del archivo
const resizeImg = async ({ suffix: sf, pathTemp, ext, size, mimetype, filename }) => {
  const suffix = sf || size
  const filePath = `${pathTemp}-${(suffix)}${ext}`

  return new Promise((resolve, reject) => {
    gm(pathTemp).resize(size).write(filePath, (error) => {
      if (error) return reject(error)
      resolve({
        filePath,
        suffix,
        filename,
        ext,
        mimetype
      })
    })
  })
}

module.exports = resizeImg
