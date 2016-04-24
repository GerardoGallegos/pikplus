'use strict'

const 
  Models = require('../../models/allModels'),
  convert = require('color-convert');





// GET ALL WORKS
exports.getWorks = function (req, res) {
  debugger
    Models.Work.find(
    {

    }/*,
    // Proyection
    {
      'name' : 1,
      'src.public': 1
    }*/,

    (err, docs) => {
      if(err) return res.status(500).send(err.message);
      console.log(docs.length)
      res.status(200).json(docs)
  })
}


// GET WORK
exports.getWork = function (req, res) {
  Models.Work.findById(req.params.id, (err, doc) => {
      if(err) console.log(err)
      console.log(doc)
      res.json(doc)
  })
}



// PUT WORK
exports.putWork = function (req, res) {
  console.log(req.body)
  Models.Work.findByIdAndUpdate(req.params.id, 
    {
      //original : body.original,
      //group : body.group,
      //aproved : true,
      //bucket : body.bucket,
      name : {
        es : req.body.name_es,
        en : req.body.name_en
      },
      url : {
        es : req.body.url_es,
        en : req.body.url_en
      },
      tags : {
        es : req.body.tags_es.split(','),
        en : req.body.tags_en.split(',')
      },
      description : {
        es : req.body.description_es,
        en : req.body.description_en
      },
      $push : { logs : {
            log : `Realizo edicion de informacion de work`,
            user : req.decoded.name
          }
      }
  }, (err, work) => {
    if(err) {
      return res.status(500).send(err.message)
      console.log(err)
    }
    res.status(200).json(work)
  })
}




// DELETE WORK
exports.deleteWork = function (req, res) {
  Models.Work.findByIdAndRemove(req.params.id, (err, docDelete) => {
    if(err){
      console.log(err)
      res.status(500).json({ 'Error' : 'Servidor' })
    }
    else {
      res.status(200).send('Usuario Eliminado Exitosamente')
    }
  })
}




/*  SET  APROVED  PUT */

exports.setApproved = function (req, res) {

  Models.Work.findByIdAndUpdate(req.params.id, 
    {
      approved : req.body.approved, 
      $push : { logs : {
            log : `Camio el approved a: ${req.body.approved}`,
            user : req.decoded.name
          }
    }
  }, (err, work) => {
    if(err) {
      return res.status(500).send(err.message)
      console.log(err)
    }
    res.status(200).json(work)
  })

}



/*  SET  ORIGINAL PUT */

exports.setOriginal = function (req, res) {

  Models.Work.findByIdAndUpdate(req.params.id, 
    {
      original : req.body.original, 
      $push : { logs : {
            log : `Camio el trabajo a: ${req.body.original}`,
            user : req.decoded.name
          }
    }
  }, (err, work) => {
    if(err) {
      return res.status(500).send(err.message)
      console.log(err)
    }
    res.status(200).json(work)
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