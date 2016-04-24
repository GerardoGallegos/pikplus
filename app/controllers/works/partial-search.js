'use strict'

const Models = require('../../models/allModels')

exports.partial = function (req, res) {
  
  let p = req.params
  let search = new RegExp(req.params.partialText, "i")
  let query = {}
      query['text'] = { $regex : search }


  // ESPAÑOL
  if(p.language === 'es' || p.language === 'espanol' || p.language === 'spanish') {

    // GROUP  BUCKET  TAGS
    if(p.model === 'group') {  _search(Models.Group)   }
    else if(p.model === 'buckets') {  _search(Models.Bucket)  }
    else if(p.model === 'tags') {  _search(Models.TagsEs)  }
    else if(p.model === 'works') { _searchWorkES(Models.Work) }
    else {
      res.send({ err : 'failed'})
    }

  }

  // ENGLISH
  else if (p.language === 'en' || p.language === 'english' || p.language === 'ingles') {

    // GROUP  BUCKET  TAGS
    if(p.model === 'group') { _search(Models.Group)  }
    else if(p.model === 'buckets') { _search(Models.bucket)  }
    else if(p.model === 'tags') { _search(Models.TagsEn)   }
    else if(p.model === 'works') { _searchWorkEN(Models.Work) }
    else {
      res.send({ err : 'failed'})
    }

  }

  // OTHER
  else {
    res.status(200).json({ err : 'faild'})
  }

  function _search(Model){
    Model.find({ 'text' : { $regex : [req.params.partialText] }}, (err, docs) => {
        if(err) {
          return res.status(500).json({ err : 'faild'})
        }
        res.status(200).json(docs)
    })
  }
  // Search Partial Work Name 

  function _searchWorkES(Model){

    let search = new RegExp(req.params.partialText)

    let pipline = [
     { $match : { 'name.es' : { $regex : search, $options: 'g'} } },
     { $group : { 
        _id : `$_id`,
        text : {'$first' : `$name.es`},
        src : {'$first' : `$src.public.es.micro`} }
     }
    ]

    Model.aggregate(pipline)
    .exec((err, docs) => {
      if(err) console.log(err)
      res.json(docs)
    })
  }

  function _searchWorkEN(Model){

    let search = new RegExp(req.params.partialText)

    let pipline = [
     { $match : { 'name.en' : { $regex : search, $options: 'g'} } },
     { $group : { 
        _id : `$_id`,
        text : {'$first' : `$name.en`},
        src : {'$first' : `$src.public.en.micro`} }
     }
    ]

    Model.aggregate(pipline)
    .exec((err, docs) => {
      if(err) console.log(err)
      res.json(docs)
    })
  }



}




exports.exact = function (req, res) {

  let p = req.params

  // ESPAÑOL
  if(p.language === 'es' || p.language === 'espanol' || p.language === 'spanish') {

    // GROUP  BUCKET  TAGS
    if(p.model === 'group') {  _exactSearch(Models.Group)  }
    else if(p.model === 'buckets') {  _exactSearch(Models.Bucket)  }
    else if(p.model === 'tags') { _exactSearch(Models.TagsEs)  }
    else {
      res.send({ err : 'failed'})
    }

  }

  // ENGLISH
  else if (p.language === 'en' || p.language === 'english' || p.language === 'ingles') {

    // GROUP  BUCKET  TAGS
    if(p.model === 'group') { _exactSearch(Models.Group)    }
    else if(p.model === 'buckets') { _exactSearch(Models.Bucket)  }
    else if(p.model === 'tags')  {  _exactSearch(Models.TagsEn)  }
    else {
      res.send({ err : 'failed'})
    }

  }

  // OTHER
  else {
    res.status(200).json({ err : 'failed'})
  }

  function _exactSearch(Model){
      let search = new RegExp(`^${req.params.text}$`),
          query = {};

      query['text'] = { 
        $regex : search,
        $options: "$i"
      }

      Model.find(query)
           .exec((err, docs)=> {
              if(err) {
                return res.status(500).json({ err : 'faild'})
              }
              res.status(200).json(docs)
           });
  }

}

//req.params.model.substring(0,1).toUpperCase() + req.params.model.substring(1, req.params.model.length)

exports.getAll = function (req, res) {

  let p = req.params

  // ESPAÑOL
  if(p.language === 'es' || p.language === 'espanol' || p.language === 'spanish') {

    // GROUP  BUCKET  TAGS
    if(p.model === 'group') {  _getAllDocs(Models.Group)  }
    else if(p.model === 'buckets') {  _getAllDocs(Models.Bucket)  }
    else if(p.model === 'tags') { _getAllDocs(Models.TagsEs)  }
    else if(p.model === 'works') { _searchWorkES_ALL(Models.Work)  }
    else {
      res.send({ err : 'failed'})
    }

  }

  // ENGLISH
  else if (p.language === 'en' || p.language === 'english' || p.language === 'ingles') {

    // GROUP  BUCKET  TAGS
    if(p.model === 'group') {  _getAllDocs(Models.Group)  }
    else if(p.model === 'buckets') {  _getAllDocs(Models.Bucket)  }
    else if(p.model === 'tags') { _getAllDocs(Models.TagsEn)  }
    else if(p.model === 'works') { _searchWorkEN_ALL(Models.Work)  }
    else {
      res.send({ err : 'failed'})
    }

  }


  function _getAllDocs(Model) {
    Model.find({}, (err, docs) => {
      if(err) {
        return res.status(500).json({ err : 'faild'})
      }
      res.status(200).json(docs)
    })
  } 

  function _searchWorkES_ALL(Model){

    Model.find({}, { 'name.en' : 1}, (err, docs) => {
      if(err) {
        return res.status(500).json({ err : 'faild'})
      }
      res.status(200).json(docs)
    })
  }

  function _searchWorkEN_ALL(Model){

    Model.find({}, { 'name' : 1 }, (err, docs) => {
      if(err) {
        return res.status(500).json({ err : 'faild'})
      }
      res.status(200).json(docs)
    })
  }

}