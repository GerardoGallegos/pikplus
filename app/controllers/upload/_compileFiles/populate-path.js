'use strict'

/*  Pobla las **** de las rutas con el nombre del proyecto:
    ejemplo:
    inglesa temp/****_/
    sale    temp/proyectName_/
*/

const populatePath = (path, rep) => {
  const key = new RegExp(/\*\*\*\*/g)
  return path.replace(key, rep)
}

module.exports = populatePath
