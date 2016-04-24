'use strict'

const gm = require('gm'),
    mkdirp = require('mkdirp'),
    each = require('async-each'),
    Promise = require('bluebird');


function resize (imgPath, sizePx, routeSave) {
  return new Promise((done, reject) => {
    gm(imgPath).resize(sizePx).write( routeSave, (err) => {
      if(err) console.log(err);
      else {
        console.log('guardado>' + routeSave);
        done();
      }
    })
  });
}

module.exports = resize;
