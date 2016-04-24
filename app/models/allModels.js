'use strict'

const Work = require('./works').Work('Works'),
  Bucket = require('./works').Bucket('Bucket'),
  Group = require('./works').Group('Group'),
  TagsEs = require('./works').Tags('TagsEs'),
  TagsEn = require('./works').Tags('tagsens');


module.exports = {
  Work : Work,
  Bucket : Bucket,
  Group : Group,
  TagsEs : TagsEs,
  TagsEn : TagsEn
}