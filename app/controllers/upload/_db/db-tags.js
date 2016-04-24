'use strict'

const Promise = require('bluebird'),
  each = require('async-each');

/*
  Este modulo se encarga de guardar llas nuevas tags en la BD
  @param [tagsStr] - {String} - Tags que vienen del cliente 'tag1,tag2'
  @param [TagsModel] - {Object} - Objeto con todos los modelos
  @param [tempSrc] - {} -
*/


module.exports = function (body, Models, tempSrc) {
  return new Promise((done, reject) => {
    // ESPAÑOL
    addTags(body.tags_es, Models.TagsEs)

    // ENGLISH
    .then(() => {
      return addTags(body.tags_en, Models.TagsEn)
    })

    //OK
    .then(() => {
      done(tempSrc)
    })

    // ERROR
    .catch((err) => {
      console.log(err)
    })

  })
}


function addTags (tagsStr, TagsModel) {
  return new Promise((done, reject) => {
    let arrayTags = tagsStr.toLowerCase().split(',');

    each(arrayTags, (tag, next) => {
      TagsModel.find({ text : tag }, (err, tagsResult) => {
        if(err) reject({ error : err, detail : 'Error al buscar Tags en BD'})
        // Ya existe tag con ese nombre  
        if(tagsResult.length > 0) {
          next()
        }
        // Se agrega nuevo tag
        if(tagsResult.length === 0) {
          let newTag = new TagsModel({
            text : tag
          })

          newTag.save((err, docs) => {
            if(err) reject({ error : err, detail : 'Error al guartas new Tag en BD'})
            console.log('Se agrego nuevo tag:: ' + docs)
            next()
          })
        }
      })
    },

    //Callback
    (err) => {
      done()
    })
  })
}