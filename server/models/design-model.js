const { Schema, model } = require('mongoose')
const shortid = require('shortid')

const DesignSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  author: { type: String, ref: 'User', required: [true, 'El Author es requerido'] },
  description: String,
  colorsRGB: [
    {
      r: Number,
      g: Number,
      b: Number,
      p: Number
    }
  ],
  colorsLAB: [
    {
      L: Number,
      A: Number,
      B: Number,
      p: Number
    }
  ],
  source: {
    s30: String,
    s100: String,
    s150: String,
    s200: String,
    s300: String,
    s1000: String
  }

}, { timestamps: true })

module.exports = model('Design', DesignSchema)
