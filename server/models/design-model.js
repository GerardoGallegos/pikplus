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
    [Number, Number, Number]
  ],
  source: {
    s10: String,
    s50: String,
    s200: String,
    s300: String,
    s1000: String
  }

}, { timestamps: true })

module.exports = model('Design', DesignSchema)
