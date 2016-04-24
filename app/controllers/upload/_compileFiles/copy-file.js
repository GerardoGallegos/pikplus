'use strict'

const fs = require('fs'),
      Promise = require('bluebird');

function copyFile(source, target) {

  return new Promise((done, reject) => {
    let rd = fs.createReadStream(source)

    rd.on("error", (err)=> {
      reject(err)
    })

    let wr = fs.createWriteStream(target)
    wr.on("error", (err)=> {
      reject(err)
    })

    wr.on("close", (ex) => {
      done()
    })

    rd.pipe(wr);  
  })

}

module.exports = copyFile
