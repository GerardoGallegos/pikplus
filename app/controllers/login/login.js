'use strict'

const cyp = require('../../util/cyp'),
  access = require('../../middlewares/access');



function login (app, UserModel) {

  app.get('/login/err', (req, res) => {
    res.status(403).json({ autentificate : 'BAD'})
  })

  app.route('/login')
    .get((req, res)=> {
      if(!req.user) res.render('login.html');
      if(req.user) res.send('Ya estas logeado ' + req.user.name)
    });
    
  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login/err' }),
    (req, res)=> {
      // OK LOGIN TRUE
      res.status(200).json({ autentificate : 'OK'})
      //res.redirect('/')
    })

  app.get('/logout',(req, res)=>{
      req.logout();
      res.redirect('/espanol')
  })

  app.route('/signup')
    .get(access.isAdmin, (req, res) => {
      res.render('signup.html')
    })
    .post((req, res)=>{
      //debugger
      console.log(req.body)
      UserModel.find({ userName : req.body.userName }, (err, userFind) => {
        if(err) console.log(err)
        else {
          if(userFind.length > 0) {
            res.send('Ya esiste usuario con ese UserName')
          }
          // Si no hay usuario con ese userName lo guarda
          if(userFind.length === 0) {
            var newUser = new UserModel({
              userName : req.body.userName,
              name : req.body.name,
              password : cyp(req.body.password, req.body.userName),
              rol : req.body.rol
            })

            newUser.save((err, docs)=> {
              if(err) console.log(err)
              res.send(docs)
            })
          }
        }
      })
    })
}
module.exports = login;