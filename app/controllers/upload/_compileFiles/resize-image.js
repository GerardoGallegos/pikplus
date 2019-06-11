'use strict'

const gm = require('gm')
const Promise = require('bluebird')

function resize (imgPath, sizePx, routeSave) {
  return new Promise((resolve, reject) => {
    gm(imgPath).resize(sizePx).write(routeSave, (err) => {
      if (err) console.log(err)
      else {
        console.log('guardado>' + routeSave)
        resolve()
      }
    })
  })
}

module.exports = resize
