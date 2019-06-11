'use strict'

const Models = require('../../models')

/* -------------------------------------------------------------------------

  /api/:language/managment/tags/:id

-------------------------------------------------------------------------- */

// GET STADISTICS
exports.getTagsStatistics = function (req, res) {
  if (validLanguage(req.params.language) === 'es') {
    _getTags(Models.TagsEs)
  } else if (validLanguage(req.params.language) === 'en') {
    _getTags(Models.TagsEn)
  } else {
    res.status(404).send('no found')
  }

  function _getTags (Model) {
    const pipline = [
      {
        $group: {
          _id: 'text',
          total: { $sum: 1 }
        }
      }
    ]

    Model.aggregate(pipline)
      .exec((err, docs) => {
        if (err) console.log(err)
        res.status(200).json(docs)
      })
  }
}

// GET ALL TAGS
exports.getTags = function (req, res) {
  if (validLanguage(req.params.language) === 'es') {
    _getTags(Models.TagsEs)
  } else if (validLanguage(req.params.language) === 'en') {
    _getTags(Models.TagsEn)
  } else {
    res.status(404).send('no found')
  }

  function _getTags (Model) {
    Model.find({ })
      .limit(500)
      .exec((err, docs) => {
        if (err) return res.status(500).send(err.message)
        console.log(docs.length)
        res.status(200).json(docs)
      })
  }
}

// GET TAG
exports.getTag = function (req, res) {
  if (validLanguage(req.params.language) === 'es') {
    _getTag(Models.TagsEs)
  } else if (validLanguage(req.params.language) === 'en') {
    _getTag(Models.TagsEn)
  } else {
    res.status(404).send('no found')
  }

  function _getTag (Model) {
    Model.findById(req.params.id, (err, doc) => {
      if (err) console.log(err)
      console.log(doc)
      res.json(doc)
    })
  }
}

// POST TAG

exports.newTag = function (req, res) {
  if (validLanguage(req.params.language) === 'es') {
    _newTag(Models.TagsEs)
  } else if (validLanguage(req.params.language) === 'en') {
    _newTag(Models.TagsEn)
  } else {
    res.status(404).send('no found')
  }

  function _newTag (Model) {
    const newTag = new Model({
      text: req.body.text
    })

    newTag.save((err, doc) => {
      if (err) {
        return res.status(500).send(err.message)
      }
      res.status(200).json(doc)
    })
  }
}

// PUT TAG
exports.putTag = function (req, res) {
  if (validLanguage(req.params.language) === 'es') {
    _putTag(Models.TagsEs)
  } else if (validLanguage(req.params.language) === 'en') {
    _putTag(Models.TagsEn)
  } else {
    res.status(404).send('no found')
  }

  function _putTag (Model) {
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
exports.deleteTag = function (req, res) {
  if (validLanguage(req.params.language) === 'es') {
    _deleteTag(Models.TagsEs)
  } else if (validLanguage(req.params.language) === 'en') {
    _deleteTag(Models.TagsEn)
  } else {
    res.status(404).send('no found')
  }

  function _deleteTag (Model) {
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
