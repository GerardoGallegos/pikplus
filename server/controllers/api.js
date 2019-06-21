'use strict'

const express = require('express')
const auth = require('./auth/auth')
// const search = require('./works/partial-search')
// const uploadWork = require('./upload/upload-work')
// const works = require('./works/api-works')
// const tags = require('./works/api-tags')
// const buckets = require('./works/api-buckets')
// const groups = require('./works/api-groups')
// const users = require('./works/users')

/*
  API REST WORKS
  *****************************************************************************
*/

// get an instance of the router for api routes
const apiRoutes = express.Router()

apiRoutes.get('/', (req, res) => {
  res.json({
    api: 'pikplus API',
    version: 1
  })
})

// AUTHORIZATION

apiRoutes
  .post('/api/auth', auth.authenticate)
  .post('/api/signup', auth.signup)

// // USERS MANAGEMENT
// apiRoutes.route('/api/users')
//   .get(auth.checkAuth(['users']), users.getAll)
//   .post(auth.checkAuth(['users']), users.newUser)

// apiRoutes.route('/api/users/:id')
//   .get(auth.checkAuth(['users']), users.getUser)
//   .put(auth.checkAuth(['users']), users.putUser)
//   .delete(auth.checkAuth(['users']), users.deleteUser)

// // WORKS MANAGEMENT
// apiRoutes.route('/api/works')
//   .get(auth.checkAuth(['works']), works.getWorks)
//   .post(auth.checkAuth(['upload']), uploadWork)

// apiRoutes.route('/api/works/:id')
//   .get(auth.checkAuth(['works']), works.getWork)
//   .put(auth.checkAuth(['works']), works.putWork)
//   .delete(auth.checkAuth(['works']), works.deleteWork)

// apiRoutes.put('/api/works/approved/:id', auth.checkToken, works.setApproved)
// apiRoutes.put('/api/works/original/:id', auth.checkToken, works.setOriginal)

// apiRoutes
//   .get('/api/:language/:model/', auth.checkAuth(['upload']), search.getAll)
//   .get('/api/:language/:model/:partialText', auth.checkAuth(['upload']), search.partial)
//   .get('/api/:language/:model/:text/exact', auth.checkAuth(['upload']), search.exact)

// // TAGS

// apiRoutes.route('/management/:language/tags/stadistics')
//   .get(tags.getTagsStatistics)

// apiRoutes.route('/management/:language/tags')
//   .get(tags.getTags)
//   .post(tags.newTag)

// apiRoutes.route('/management/:language/tags/:id')
//   .get(tags.getTag)
//   .put(tags.putTag)
//   .delete(tags.deleteTag)

// // BUCKETS
// apiRoutes.route('/management/:language/buckets')
//   .get(buckets.getBuckets)
//   .post(buckets.newBucket)

// apiRoutes.route('/management/:language/buckets/:id')
//   .get(buckets.getBucket)
//   .put(buckets.putBucket)
//   .delete(buckets.deleteBucket)

// // GROUPS
// apiRoutes.route('/management/:language/groups')
//   .get(groups.getGroups)
//   .post(groups.newGroup)

// apiRoutes.route('/management/:language/groups/:id')
//   .get(groups.getGroup)
//   .put(groups.putGroup)
//   .delete(groups.deleteGroup)

module.exports = apiRoutes

/*****************************************************************
   |__________ URL ___________| METHOD |        DESCRIPTION         |
   ________________________________________________________________
   |                         |        |                            |
 ******************************************************************/
