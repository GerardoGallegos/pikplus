'use strict'

/*
  @method [ getProcess ] - Regresa un objeto con el script y el param
  @param  [ comand ]{String} -  '[RESIZE_IMG:500]'
  @return {Object}

        {
          type: '.txt',
          process: '[CREATE_LICENCE:STANDARD]',
          name: 'LICENCE.txt'
        }

*/
const getProcess = (comand) => {
  const script = comand.substring(comand.search(/\[/g) + 1, comand.search(/\:|\]/g))

  const getParam = (comand) => {
    // Existe parametro
    if (comand.search(/:/g) !== -1) {
      // comand = [RESIZE-IMAGE:500]  _comand = 500
      var _comand = comand.substring(comand.search(/\:/g) + 1, comand.search(/\]/g))

      // Numero
      if (!isNaN(_comand)) return parseInt(_comand)
      // String
      if (isNaN(_comand)) return _comand
    } else {
      // No existe
      return false
    }
  }

  return {
    comand: script,
    param: getParam(comand)
  }
}

module.exports = getProcess
