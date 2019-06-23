const mongoose = require('mongoose')

let MONGO_URI = process.env.MONGO_URI_DEV

if (process.env.NODE_ENV === 'test') {
  MONGO_URI = process.env.MONGO_URI_TEST
}

if (process.env.NODE_ENV === 'production') {
  MONGO_URI = process.env.MONGO_URI_PRODUCTION
}

mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .catch((error) => {
    console.log('ERROR MONGO-DB::', error)
    throw error
  })
