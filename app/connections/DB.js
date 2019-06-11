//  Conexion a base de datos

const mongoose = require('mongoose')

module.exports = function (DB_NAME, mongoURI) {
  console.log('DB____' + DB_NAME)
  return mongoose.createConnection('mongodb://localhost/' + DB_NAME, function (err) {
    if (err) {
      console.log(err)
      throw (err)
    }
  })
}
