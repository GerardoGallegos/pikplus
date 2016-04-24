'use strict'

const cyp   = require('../../util/cyp'),
  User      = require('../../models/user'),
  jwt       = require('jsonwebtoken'),
  SECRET = 'Mega Secret key';





exports.authenticate = function (req, res) {
  User.findOne({
    username : req.body.username
  },

  (err, user) => {
    // ERR
    if(err) return res.status(500).send('Problemas con servidor')
    // NO USER
    if (!user) {
      res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
    }
    // OK USER
    if (user) {
      // PASS INVALID
      if(user.password !== cyp(req.body.password, req.body.username)) {
        res.status(401).json({ success: false, message: 'Authentication failed. Pass Invalid' });
      }
      // PASS OK
      else if(user.password === cyp(req.body.password, req.body.username)) {
        let dataExposed = {
          name : user.name,
          permissions : user.permissions
        }
        let token = jwt.sign(dataExposed, SECRET, {
          expiresIn: 6000 // expires in 24 hours
        });

        res.status(200)
        .json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  })
}



// How to Secure JWT http://www.toptal.com/web/cookie-free-authentication-with-json-web-tokens-an-example-in-laravel-and-angularjs
/*https://toddmotto.com/a-better-way-to-scope-angular-extend-no-more-vm-this/*/





exports.checkAuth = function (permissions) {


  return function(req, res, next) {

    console.log(req.headers)
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, SECRET, function(err, decoded) {      
        if (err) {
          return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });    
        } 

        else {

          console.log(permissions, decoded.permissions)
          console.log(hasAccess(permissions, decoded.permissions))
          // Has access
          if(hasAccess(permissions, decoded.permissions)){
            console.log(permissions, decoded.permissions)
            req.decoded = decoded;  
            next();
          }
          // No has access
          else {
            res.status(401).send({ 
                success: false, 
                message: 'No tienes permiso para entrar a esta area' 
            })
          }
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(401).send({ 
          success: false, 
          message: 'No token provided.' 
      });
      
    }


  }

  function hasAccess (arrayConfig, objectToken) {

    let authorized = false;

    arrayConfig.forEach((permiso) => {
      for(let key in objectToken){
        if(permiso === key && objectToken[key] === true || objectToken[key] === 'true'){
          authorized = true;
        }
      }
    })

    return authorized
  }

}


// route middleware to verify a token
exports.checkToken = function (req, res, next){

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, SECRET, function(err, decoded) {      
      if (err) {
        return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;  
        console.log(req.decoded)  
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(401).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
}