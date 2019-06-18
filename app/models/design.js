const { Schema, model } = require('mongoose')
const shortid = require('shortid')

const DesignSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  author: { type: String, ref: 'User', required: [true, 'El Author es requerido'] }
}, { timestamps: true })

module.exports = model('Design', DesignSchema)
