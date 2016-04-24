//  CONEXION A BASE DE DATOS

var mongoose = require('mongoose');

module.exports = function (DBNAME, mongoURI) {

  console.log('DB____' +  DBNAME)
  return mongoose.createConnection('mongodb://localhost/' + DBNAME, function (err) {
    if(err) console.log(err);
    else {
      console.log('CONECTADO A BD EXITOSAMENTE!' + DBNAME);
    }
  });

};