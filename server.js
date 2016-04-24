
'use strict'

require('dotenv').config();                                   // Configurando Variables de entorno en archivo .env


const 
    express = require("express"),  
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    bodyParser  = require("body-parser"),
    morgan      = require('morgan'),
    methodOverride = require("method-override"),
    swig = require('swig'),
    multiparty = require('connect-multiparty'),
    API = require('./app/controllers/api');


const multipartyMiddleware = multiparty()                   //  Parsear multiparte

                                               
app.use(morgan('dev'))                                      //  use morgan to log requests to the console
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json({limit : '5mb'})); 
app.use(methodOverride())                                   //  manejar peticiones DELET; PUT; 
app.use(multipartyMiddleware)                               //  Parsear multiparte
app.use(express.static('./public'))                         //  ESTATICOS
app.engine('html', swig.renderFile)                         //  CONFIGURACION DE swig
app.set('view engine', 'html')
app.set('views', __dirname + '/app/views')
app.use(API)


let sockets = require('./app/connections/sockets')(io)      // Sockets management 


http.listen(process.env.PORT, ()=> {
  console.log("Node server running on http://localhost:::" + process.env.PORT);
});
