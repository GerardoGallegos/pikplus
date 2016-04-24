'use strict'

const Promise = require('bluebird');

module.exports = function (body, Models, tempSrc) {

  return new Promise ((done, reject) =>{
    Models.Group.find({ text : body.group }, (err, docs) => {
      if(docs.length > 0) {
        //Acualiza
        update_group (Models.Group, body, tempSrc).then((d) => {
          //console.log('Actualizado grupo', d)
          done({ tempSrc : tempSrc, log : 'Actualizado grupo' })
        })
      }
      if(docs.length === 0) {
        //Guarda Nuevo
        create_group (Models.Group, body, tempSrc).then(() => {
          //console.log('Nuevo grupo')
          done( { tempSrc : tempSrc, log : 'Nuevo grupo' })
        })
      }
    })
  })
}



function create_group (GroupModel, body, tempSrc) {
  return new Promise((done, reject) => {
    let newGroup = new GroupModel({
      text : body.group,
      src : tempSrc.public.en.micro,
      bucket : body.bucket,
      name : {
        es : body.name_es,
        en : body.name_en
      },
      tags : {
        es : body.tags_es.split(','),
        en : body.tags_en.split(',')
      },
      description : {
        es : body.description_es,
        en : body.description_en
      }
    })

    newGroup.save((err, docs) => {
      if(err) reject({ error : err, detail : 'Error al crear nuevo Grupo DB'})
      done(docs)
    })    
  })
}


function update_group (GroupModel, body, tempSrc) {
  return new Promise((done, reject) => {
    GroupModel.findOneAndUpdate({ text : body.group }, {})
    .update({
      tags : {
        es : body.tags_es.split(','),
        en : body.tags_en.split(',')
      }
    })
    .exec((err, d) => {
      if(err) reject(err)
      done(d)
    })
  })
}
