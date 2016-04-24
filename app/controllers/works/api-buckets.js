'use strict'

const 
  Models = require('../../models/allModels');



/*-------------------------------------------------------------------------

  /api/:language/managment/buckets/:id

--------------------------------------------------------------------------*/

// GET ALL BUCKETS
exports.getBuckets = function (req, res) {

  if(validLanguage(req.params.language)  === 'es') {
    _getBuckets(Models.Bucket)
  }
  else if(validLanguage(req.params.language)  === 'en'){
    _getBuckets(Models.Bucket)  
  }
  else {
    res.status(404).send('no found')
  }

  function _getBuckets (Model){
    Model.find({ }, (err, docs) => {
      if(err) return res.status(500).send(err.message);
      console.log(docs.length)
      res.status(200).json(docs)
    })
  }

}


// GET TAG
exports.getBucket = function (req, res) {

  if(validLanguage(req.params.language)  === 'es') {
    _getBucket(Models.Bucket)
  }
  else if(validLanguage(req.params.language)  === 'en') {
    _getBucket(Models.Bucket)
  }
  else {
    res.status(404).send('no found')
  }

  function _getBucket (Model){
    Model.findById(req.params.id, (err, doc) => {
      if(err) console.log(err)
      console.log(doc)
      res.json(doc)
    })
  }
}



// POST TAG

exports.newBucket = function(req, res) {
  if(validLanguage(req.params.language)  === 'es') {
    _newBucket(Models.Bucket)
  }
  else if(validLanguage(req.params.language)  === 'en') {
    _newBucket(Models.Bucket)
  }
  else {
    res.status(404).send('no found')
  }

  function _newBucket(Model) {
    let newBucket = new Model({
      text : req.body.text
    })

    newBucket.save((err, doc) => {
      if(err) {
        return res.status(500).send(err.message)
      }
      res.status(200).json(doc)
    })
  }
}


// PUT TAG
exports.putBucket = function (req, res) {

  if(validLanguage(req.params.language)  === 'es') {
    _putBucket(Models.Bucket)
  }
  else if(validLanguage(req.params.language)  === 'en') {
    _putBucket(Models.Bucket)
  }
  else {
    res.status(404).send('no found')
  }

  function _putBucket(Model) {
    Model.findByIdAndUpdate(req.params.id, 
      {
        text: req.body.text
      }, (err, tag) => {
      if(err) {
        console.log(err)
        return res.status(500).send(err.message)
      }
      res.status(200).json(tag)
    })
  }
}




// DELETE WORK
exports.deleteBucket = function (req, res) {

  if(validLanguage(req.params.language)  === 'es') {
    _deleteBucket(Models.Bucket)
  }
  else if(validLanguage(req.params.language)  === 'en') {
    _deleteBucket(Models.Bucket)
  }
  else {
    res.status(404).send('no found')
  }


  function _deleteBucket(Model) {
    Model.findByIdAndRemove(req.params.id, (err, docDelete) => {
      if(err){
        console.log(err)
        res.status(500).json({ 'Error' : 'Servidor' })
      }
      else {
        res.status(200).send('Tag Eliminada Exitosamente')
      }
    })    
  }
}



/* UTIL
------------------------------------------*/

function validLanguage(language) {
  let lang = language.toLocaleLowerCase()

  if(lang === 'es' || lang === 'espanol' || lang === 'spanish') {
    return 'es'
  }
  else if (lang === 'en' || lang === 'ingles' || lang === 'english') {
    return 'en'
  }
  else {
    return false
  }
}