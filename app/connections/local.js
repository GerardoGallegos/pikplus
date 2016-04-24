'use strict'

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  scmp = require('scmp'), //Safe, constant-time comparison of strings.
  cyp = require('../util/cyp');




module.exports = function (User) {
  passport.use(new LocalStrategy({
      usernameField: 'userName',
      passwordField: 'password',
      session: false
      },
    (user, password, done)=> {
      User.findOne({ userName: user }, (err, userFind) =>{
        // Si hay error
        if (err) return done(err);
        // Si no hay usuario
        if (!userFind) { console.log('NO USER'); return done(null, false); }
        // Si hay usuario pero la contraseña es diferente
        if ( !scmp(userFind.password, cyp(password, user)) ) {  console.log('PASS'); return done(null, false);}
        // Si todo es correcto
        if(scmp(userFind.password, cyp(password, user))){
          console.log('LOGEADO EXITOSAMENTE');
          // Expone los datos objeto con DATOS API EXPUESTA
          return done(null, { name : userFind.name, rol : userFind.rol });
        }
        
      });
    }
  ));
};