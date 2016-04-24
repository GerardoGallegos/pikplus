'use strict'

const Promise = require('bluebird'),
      convert = require('color-convert');

module.exports = function(body, Models) {
  return new Promise((done, reject) => {
    Models.Work.find({
      '$or' : [
        {
          'url.es' : body.url_es
        },
        {
          'url.en' : body.url_en
        },
      ] 
    }, (err, docs) => {
      if(err) reject({error : err, detail : 'Error al listar works pre-save'})
      if(docs.length > 0) reject({error : err, detail : 'Nombre de trabajo duplicado'})
      saveWork(Models.Work, body).then((doc) => {
        done(doc)
      })
    })
  })
}


function saveWork (WorkModel, body) {
  return new Promise((done, reject) => {
    let newWork = new WorkModel({
      original : body.original,
      group : body.group,
      aproved : true,
      bucket : body.bucket,
      name : {
        es : body.name_es,
        en : body.name_en
      },
      url : {
        es : body.url_es,
        en : body.url_en
      },
      tags : {
        es : body.tags_es.split(','),
        en : body.tags_en.split(',')
      },
      description : {
        es : body.description_es,
        en : body.description_en
      },
      colorsRGB : _prepareColorsData(body.colorsData),
      colorsLAB : _prepareColorsLAB(body.colorsData),
      //  SERVER
      logs : [{
        log : 'Upload Work',
        user : 'USUARIO {GERARDO:GALLEGOS}'
      }]
    })

    newWork.save((err, doc) => {
      if(err) reject({ error : err, detail : 'Error al guardar pre-save-work'})
      done(doc)
    })
  })
}


// var colorsData: "0,217,225,0.5688523264091115#254,204,223,0.13473920921503915#251,98,157,0.11445350417394681#156,54,116,0.07129359994823012#244,74,142,0.06596939105675273#1,150,159,0.044691969196919694#"
function _prepareColorsData (stringArray) {
  let arrayColors = stringArray.split('#')
  let arrayFinal = []
  for(let i =0; i<arrayColors.length-1; i++) {
    let extract = arrayColors[i].split(',')
    
    arrayFinal.push({ 
      r : extract[0], 
      g : extract[1], 
      b : extract[2], 
      p : extract[3] 
    })

    if(i === arrayColors.length -2) {
      return arrayFinal
    }
  }
}

//0,217,225,0.5688523264091115
function _prepareColorsLAB (stringArray) {
  let arrayColors = stringArray.split('#')
  let arrayFinal = []
  for(let i = 0; i<arrayColors.length-1; i++) {
    let extract = arrayColors[i].split(',')
    let colorLAB = convert.rgb.lab(extract[0],extract[1], extract[2])

    arrayFinal.push({ 
      L : colorLAB[0], 
      A : colorLAB[1], 
      B : colorLAB[2], 
      p : extract[3]  
    })

    if(i === arrayColors.length -2) {
      return arrayFinal
    }
  }
}