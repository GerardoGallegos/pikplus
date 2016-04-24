'use strict'

const
  User = require('../../models/user'),
  cyp   = require('../../util/cyp');

// GET ALL USERS
exports.getAll = function (req, res) {

    User.find({}, (err, docs) => {
      if(err) return res.status(500).send(err.message);
      console.log(docs.length)
      res.status(200).json(docs)
  })
}



/* NEW USER [ POST ]

*************************************************************************/
exports.newUser = function (req, res) {
  console.log(req.body)
  User.find({ username : req.body.username }, (err, userFind) => {
    debugger
    if(err){
      console.log(err); res.status(500).send('Problemas con servidor')
    }
    else {
      if(userFind.length > 0) {
            res.status(403).send(`Usuario ${req.body.username} No disponible`)
      }
      // Si no hay usuario con ese userName lo guarda
      if(userFind.length === 0) {
            let newUser = new User({
              username : req.body.username,
              name : req.body.name,
              password : cyp(req.body.password, req.body.username),
              permissions : {
                works : req.body.works,
                statistics : req.body.statistics,
                upload : req.body.upload,
                users : req.body.users
              },
              logs : [{
                  log : `Usuario creado`,
                  user : req.decoded.name
              }]
              
            })

            newUser.save((err, docs)=> {
              if(err) console.log(err)
              res.status(200).send(docs)
            })
      }
    }
  })

}





/* GETUSER [ GET ]

*************************************************************************/
exports.getUser = function (req, res) {
  User.findById(req.params.id, (err, doc) => {
      if(err) console.log(err)
      console.log(doc)
      res.json(doc)
  })
}



/* PUT USER [ PUT ]

*************************************************************************/
exports.putUser = function (req, res) {
  //res.status(403).json({a : 'PUT WORK'})
  console.log(req.decoded)

  User.findByIdAndUpdate(req.params.id, 
    {
      'permissions.works' : req.body.works,
      'permissions.statistics' : req.body.statistics,
      'permissions.upload' : req.body.upload,
      'permissions.users' : req.body.users,
      $push : { logs : {
            log : `Cambio permisos de: WORKS -> ${req.body.works}, STATISTICS -> ${req.body.statistics}, UPLOAD -> ${req.body.upload}, USERS ->  ${req.body.users}`,
            user : req.decoded.name
          }
      }

    }, (err, work) => {
    if(err) {
      return res.status(500).send(err.message)
      console.log(err)
    }
    res.status(200).json(work)
  })
}


/* DELETE USER [ DELETE ]

*************************************************************************/
exports.deleteUser = function (req, res) {
  User.findByIdAndRemove(req.params.id, (err, docDelete) => {
    if(err){
      console.log(err)
      res.status(500).json({ 'Error' : 'Servidor' })
    }
    else {
      res.status(200).send('Usuario Eliminado Exitosamente')
    }
  })
}



//  SET  APROVED  PUT 

exports.setApproved = function (req, res) {

  var user = 'Gerardo Gallegos' //req.user.name

  Models.Work.findByIdAndUpdate(req.params.id, 
    {
      approved : req.body.approved, 
      $push : { logs : {
            log : `Camio el approved a: ${req.body.approved}`,
            user : user
          }
      }
  }, (err, work) => {
    if(err) {
      return res.status(500).send(err.message)
      console.log(err)
    }
    res.status(200).json(work)
  })

}






function _getBoolean(stringBoolean) {
    if(stringBoolean === 'false' || stringBoolean === false){
      return false
    }

    else if(stringBoolean === 'true' || stringBoolean === true){
      return true
    }
}