'use strict'




// route middleware to verify a token
exports.checkToken = function (req, res, next){

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, SECRET, function(err, decoded) {      
      if (err) {
        return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
}












/*
 * @method isAdmin - Verifica que el usuario este logeado y que tenga el rol de admin
 * @param { String } [ redirect ] - si existe un redirect redirige al usuario a esa ruta, sino por defaulr a /login
*/

/*module.exports.isAdmin = function (req, res, next){
  console.log(req.user);
  if(req.user && req.user.rol === 'admin'){
    next();
  }else {
    res.redirect('/login');
  }
};
*/