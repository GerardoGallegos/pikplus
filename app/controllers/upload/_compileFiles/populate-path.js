'use strict'

/*  Pobla las **** de las rutas con el nombre del proyecto:
    ejemplo:
    inglesa temp/****_/
    sale    temp/proyectName_/
*/


let populatePath = (path, rep) => {
  let key =  new RegExp(/\*\*\*\*/g);
  return path.replace(key, rep);
}

module.exports = populatePath;