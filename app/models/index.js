'use strict'

const Work = require('./works').Work('Works')
const Bucket = require('./works').Bucket('Bucket')
const Group = require('./works').Group('Group')
const TagsEs = require('./works').Tags('TagsEs')
const TagsEn = require('./works').Tags('tagsens')

module.exports = {
  Work: Work,
  Bucket: Bucket,
  Group: Group,
  TagsEs: TagsEs,
  TagsEn: TagsEn
}
