'use strict'

// Conexion a Base de Datos
const DB = require('../connections/DB')(process.env.DB_WORKS)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// WORK

exports.Work = function (collectionName) {
  // Esquema de work
  const Work = DB.model(collectionName, new Schema({
    // CLIENT
    original: { type: Boolean, default: false },
    group: { type: String, required: true },
    approved: { type: Boolean, default: false },
    bucket: { type: String, required: true },
    name: {
      es: { type: String, required: true, unique: true },
      en: { type: String, required: true, unique: true }
    },
    url: {
      es: { type: String, required: true, unique: true },
      en: { type: String, required: true, unique: true }
    },
    tags: {
      es: { type: [String], required: true },
      en: { type: [String], required: true }
    },
    description: {
      es: { type: String, required: true },
      en: { type: String, required: true }
    },
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
    //  SERVER

    updated: { type: Date, default: Date.now },
    logs: [{
      log: String,
      user: String,
      date: { type: Date, default: Date.now }
    }],
    downloadsCount: { type: Number, default: 0 },

    // AWS S3
    src: {
      public: {
        es: {
          big: { type: String, default: 'null' },
          medium: { type: String, default: 'null' },
          small: { type: String, default: 'null' },
          micro: { type: String, default: 'null' },
          nano: { type: String, default: 'null' }
        },
        en: {
          big: { type: String, default: 'null' },
          medium: { type: String, default: 'null' },
          small: { type: String, default: 'null' },
          micro: { type: String, default: 'null' },
          nano: { type: String, default: 'null' }
        }
      },

      standard: {
        vector: { type: String, default: 'null' },
        psd: { type: String, default: 'null' },
        2000: { type: String, default: 'null' },
        5000: { type: String, default: 'null' }
      },

      premium: {
        vector: { type: String, default: 'null' },
        psd: { type: String, default: 'null' },
        2000: { type: String, default: 'null' },
        5000: { type: String, default: 'null' }
      }
    }

  }))

  // MODEL
  return Work
}

//  BUCKET
exports.Bucket = function (collectionName) {
  // Esquema de Bucket

  var Bucket = DB.model(collectionName, new mongoose.Schema({
    text: { type: String, unique: true },
    src: String,
    created: { type: Date, default: Date.now }
  }))

  // MODEL

  return Bucket
}

// GROUPS
exports.Group = function (collectionName) {
  // Esquema de Group

  const Group = DB.model(collectionName, new mongoose.Schema({
    text: { type: String, unique: true },
    src: String,
    created: { type: Date, default: Date.now },
    bucket: String,
    name: {
      es: String,
      en: String
    },
    tags: {
      es: [String],
      en: [String]
    },
    description: {
      es: String,
      en: String
    }
  }))
  // MODEL
  return Group
}

// TAGS

exports.Tags = function (collectionName) {
  const Tags = DB.model(collectionName, new mongoose.Schema({
    text: { type: String, unique: true },
    created: { type: Date, default: Date.now }
  }))

  return Tags
}
