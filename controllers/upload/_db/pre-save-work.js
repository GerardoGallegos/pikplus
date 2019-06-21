'use strict'

const Promise = require('bluebird')
const convert = require('color-convert')

module.exports = function (body, Models) {
  return new Promise((resolve, reject) => {
    Models.Work.find({
      $or: [
        {
          'url.es': body.url_es
        },
        {
          'url.en': body.url_en
        }
      ]
    }, (err, docs) => {
      if (err) {
        console.log('Error al listar works pre-save')
        reject(err)
      }
      if (docs.length > 0) {
        console.log('Nombre de trabajo duplicado')
        reject(err)
      }
      saveWork(Models.Work, body).then((doc) => {
        resolve(doc)
      })
    })
  })
}

function saveWork (WorkModel, body) {
  return new Promise((resolve, reject) => {
    const newWork = new WorkModel({
      original: body.original,
      group: body.group,
      aproved: true,
      bucket: body.bucket,
      name: {
        es: body.name_es,
        en: body.name_en
      },
      url: {
        es: body.url_es,
        en: body.url_en
      },
      tags: {
        es: body.tags_es.split(','),
        en: body.tags_en.split(',')
      },
      description: {
        es: body.description_es,
        en: body.description_en
      },
      colorsRGB: _prepareColorsData(body.colorsData),
      colorsLAB: _prepareColorsLAB(body.colorsData),
      //  SERVER
      logs: [{
        log: 'Upload Work',
        user: 'USUARIO {GERARDO:GALLEGOS}'
      }]
    })

    newWork.save((err, doc) => {
      if (err) {
        console.log('Error al guardar pre-save-work')
        reject(err)
      }
      resolve(doc)
    })
  })
}

// var colorsData: "0,217,225,0.5688523264091115#254,204,223,0.13473920921503915#251,98,157,0.11445350417394681#156,54,116,0.07129359994823012#244,74,142,0.06596939105675273#1,150,159,0.044691969196919694#"
function _prepareColorsData (stringArray) {
  const arrayColors = stringArray.split('#')
  const arrayFinal = []
  for (let i = 0; i < arrayColors.length - 1; i++) {
    const extract = arrayColors[i].split(',')

    arrayFinal.push({
      r: extract[0],
      g: extract[1],
      b: extract[2],
      p: extract[3]
    })

    if (i === arrayColors.length - 2) {
      return arrayFinal
    }
  }
}

// 0,217,225,0.5688523264091115
function _prepareColorsLAB (stringArray) {
  const arrayColors = stringArray.split('#')
  const arrayFinal = []
  for (let i = 0; i < arrayColors.length - 1; i++) {
    const extract = arrayColors[i].split(',')
    const colorLAB = convert.rgb.lab(extract[0], extract[1], extract[2])

    arrayFinal.push({
      L: colorLAB[0],
      A: colorLAB[1],
      B: colorLAB[2],
      p: extract[3]
    })

    if (i === arrayColors.length - 2) {
      return arrayFinal
    }
  }
}
