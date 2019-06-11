'use strict'

const Promise = require('bluebird')

module.exports = function (body, Models, tempSrc) {
  return new Promise((resolve, reject) => {
    Models.Group.find({ text: body.group }, (err, docs) => {
      if (err) {
        throw err
      }

      if (docs.length > 0) {
        // Acualiza
        update_group(Models.Group, body, tempSrc).then((d) => {
          // console.log('Actualizado grupo', d)
          resolve({ tempSrc: tempSrc, log: 'Actualizado grupo' })
        })
      } else if (docs.length === 0) {
        // Guarda Nuevo
        create_group(Models.Group, body, tempSrc).then(() => {
          // console.log('Nuevo grupo')
          resolve({ tempSrc: tempSrc, log: 'Nuevo grupo' })
        })
      }
    })
  })
}

function create_group (GroupModel, body, tempSrc) {
  return new Promise((resolve, reject) => {
    const newGroup = new GroupModel({
      text: body.group,
      src: tempSrc.public.en.micro,
      bucket: body.bucket,
      name: {
        es: body.name_es,
        en: body.name_en
      },
      tags: {
        es: body.tags_es.split(','),
        en: body.tags_en.split(',')
      },
      description: {
        es: body.description_es,
        en: body.description_en
      }
    })

    newGroup.save((err, docs) => {
      console.log('Error al crear nuevo Grupo DB')
      if (err) reject(err)
      resolve(docs)
    })
  })
}

function update_group (GroupModel, body, tempSrc) {
  return new Promise((resolve, reject) => {
    GroupModel.finresolveAndUpdate({ text: body.group }, {})
      .update({
        tags: {
          es: body.tags_es.split(','),
          en: body.tags_en.split(',')
        }
      })
      .exec((err, d) => {
        if (err) reject(err)
        resolve(d)
      })
  })
}
