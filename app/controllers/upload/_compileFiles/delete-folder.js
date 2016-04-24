'use strict'

const Promise = require('bluebird'),
      del = require('delete');


function _deleteFolder (path) {
  return new Promise ((done, reject) => {
    del([path], (err) => {
      if (err) reject({ error : err, detail : 'Error al eliminar folder modulo[delete-folder]'})
      done()
    })
  })
}


module.exports = _deleteFolder