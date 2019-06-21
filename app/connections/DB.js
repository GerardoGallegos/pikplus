const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .catch((error) => {
    console.log('ERROR MONGO-DB::', error)
    throw error
  })
