'use strict'

const mkdirp = require('mkdirp'),
      Promise = require('bluebird');

function createFolder (path) {
  return new Promise( (done, reject) => {
      mkdirp(path, (err) => {
          if(err) reject({ error : err, detail : `rror al crear el Folder mkdirp ${path}` });
          done('Folders creados::> ' + path);
      })
  })
}

module.exports = createFolder;