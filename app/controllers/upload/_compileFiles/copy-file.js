'use strict'

const fs = require('fs')
const Promise = require('bluebird')

function copyFile (source, target) {
  return new Promise((resolve, reject) => {
    const rd = fs.createReadStream(source)

    rd.on('error', (err) => {
      reject(err)
    })

    const wr = fs.createWriteStream(target)
    wr.on('error', (err) => {
      reject(err)
    })

    wr.on('close', (ex) => {
      resolve()
    })

    rd.pipe(wr)
  })
}

module.exports = copyFile
