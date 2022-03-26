const { Page, User } = require('../models');
const router = require('express').Router();

router.get('/', function(req, res){
  // Modificar para renderizar todas los usuarios que se encuentren
  // dento de la base de datos
  // Tu código acá:
  User.findAll().then(users => res.render('users', {users}))
});

router.get('/:id', function(req, res){
  // Modificar para renderizar los datos del usuario seleccionado
  // Tu código acá:
  User.findByPk(req.params.id,{
    include: Page
  }).then(user =>{
    res.render('unUsuarioEnParticular', {user})
  })
});

module.exports = router;
