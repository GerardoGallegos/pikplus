const sanitize = require('mongo-sanitize')
const models = require('../../models')
const uploadDesign = require('../util/upload-design')

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

    const { locations, colorsRGB } = await uploadDesign(req, [10, 50, 200, 300, 500, 1000])

    const design = await models.Design.create({
      description: req.body.description,
      author: req.decode.sub,
      colorsRGB,
      source: {
        s10: locations['10'],
        s50: locations['50'],
        s200: locations['200'],
        s300: locations['300'],
        s500: locations['500'],
        s1000: locations['1000']
      }
    })

    // console.log('**', output)

    // const { description } = req.body.design

    // res.json({
    //   design
    // })

    res.json({ design })
  } catch (error) {
    next(error)
  }
}
