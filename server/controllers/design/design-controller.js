const sanitize = require('mongo-sanitize')
const models = require('../../models')

exports.getAll = async (req, res, next) => {
  try {
    let limit = 15
    let skip = 0
    let query = {}

    const text = req.query.text ? new RegExp(
      sanitize(req.query.text), 'i'
    ) : null

    if (text) {
      query = {
        $or: [
          { description: { $regex: text, $options: 'i' } }
        ]
      }
    }

    if (typeof req.query.skip !== 'undefined') {
      skip = Number(req.query.skip)
    }

    if (typeof req.query.limit !== 'undefined') {
      limit = Number(req.query.limit)
    }

    const total = await models.Design
      .find(query)
      .countDocuments()

    const designs = await models.Design
      .find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec()

    res.json({
      error: null,
      designs,
      total,
      hasMore: skip + designs.length < total
    })
  } catch (error) {
    next(error)
  }
}

exports.post = async (req, res, next) => {
  try {
    if (!req.decode.sub) {
      return res.json({
        error: true,
        errorMessage: 'No tienes permiso de realizar esta operacion'
      })
    }

    const { description } = req.body.design

    const design = await models.Design.create({
      author: req.decode.sub,
      description
    })

    res.json({
      design
    })
  } catch (error) {
    next(error)
  }
}
