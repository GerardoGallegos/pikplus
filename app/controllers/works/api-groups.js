'use strict'

const Models = require('../../models')

/* -------------------------------------------------------------------------

  /api/:language/managment/buckets/:id

-------------------------------------------------------------------------- */

// GET ALL GROUPS
exports.getGroups = function (req, res) {
  if (validLanguage(req.params.language) === 'es') {
    _getGroups(Models.Group)
  } else if (validLanguage(req.params.language) === 'en') {
    _getGroups(Models.Group)
  } else {
    res.status(404).send('no found')
  }

  function _getGroups (Model) {
    Model.find({ }, /* { text : 1}, */ (err, docs) => {
      if (err) return res.status(500).send(err.message)
      console.log(docs.length)
      res.status(200).json(docs)
    })
  }
}

// GET GROUP
exports.getGroup = function (req, res) {
  if (validLanguage(req.params.language) === 'es') {
    _getGroup(Models.Group)
  } else if (validLanguage(req.params.language) === 'en') {
    _getGroup(Models.Group)
  } else {
    res.status(404).send('no found')
  }

  function _getGroup (Model) {
    Model.findById(req.params.id, (err, doc) => {
      if (err) console.log(err)
      console.log(doc)
      res.json(doc)
    })
  }
}

// POST TAG

exports.newGroup = function (req, res) {
  if (validLanguage(req.params.language) === 'es') {
    _newGroup(Models.Group)
  } else if (validLanguage(req.params.language) === 'en') {
    _newGroup(Models.Group)
  } else {
    res.status(404).send('no found')
  }

  function _newGroup (Model) {
    const _newGroup = new Model({
      text: req.body.text
    })

    _newGroup.save((err, doc) => {
      if (err) {
        return res.status(500).send(err.message)
      }
      res.status(200).json(doc)
    })
  }
}

// PUT TAG
exports.putGroup = function (req, res) {
  if (validLanguage(req.params.language) === 'es') {
    _putGroup(Models.Group)
  } else if (validLanguage(req.params.language) === 'en') {
    _putGroup(Models.Group)
  } else {
    res.status(404).send('no found')
  }

  function _putGroup (Model) {
    Model.findByIdAndUpdate(req.params.id,
      {
        text: req.body.text
      }, (err, tag) => {
        if (err) {
          console.log(err)
          return res.status(500).send(err.message)
        }
        res.status(200).json(tag)
      })
  }
}

// DELETE WORK
exports.deleteGroup = function (req, res) {
  if (validLanguage(req.params.language) === 'es') {
    _deleteGroup(Models.Group)
  } else if (validLanguage(req.params.language) === 'en') {
    _deleteGroup(Models.Group)
  } else {
    res.status(404).send('no found')
  }

  function _deleteGroup (Model) {
    Model.findByIdAndRemove(req.params.id, (err, docDelete) => {
      if (err) {
        console.log(err)
        res.status(500).json({ Error: 'Servidor' })
      } else {
        res.status(200).send('Tag Eliminada Exitosamente')
      }
    })
  }
}

/* UTIL
------------------------------------------ */

function validLanguage (language) {
  const lang = language.toLocaleLowerCase()

  if (lang === 'es' || lang === 'espanol' || lang === 'spanish') {
    return 'es'
  } else if (lang === 'en' || lang === 'ingles' || lang === 'english') {
    return 'en'
  } else {
    return false
  }
}
