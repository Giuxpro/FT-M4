const router = require('express').Router();
const { Page, User } = require('../models');


router.post('/', async function(req, res) {
  // Modificar para que cuando se clickee el botón de "SUBMIT" se cree un nuevo post
  // tomando los datos desde el form y agregándolo a la base de datos
  // (Debe incluir también la categoría a la/s cual/es pertenece)
  // Tu código acá:
  const { authorName, authorEmail, title, content, categories} = req.body

  // User.findOrCreate({
//   where:{
//     name: authorName,
//     email: authorEmail,
//   }
// }).then( user =>{
//   Page.create({
//     title,
//     content
//   }).then(page =>{
//       page.setUser(user[0].dataValues.id)
//       page.setCategories(categories)
//       res.redirect(page.route)
//   })
// })
//   .catch(err =>{
//     res.status(401).json({data:err})
//   })

// });
//#### FORMA 2 CON ASYNC AWAIT####
const userCreated = await User.findOrCreate({
  where:{
    name: authorName,
    email: authorEmail
  }
})
const pageCreated = await Page.create({
  title,
  content,
})

  await pageCreated.setUser(userCreated[0].dataValues.id)
  await pageCreated.setCategories(categories)

  res.redirect(pageCreated.route)

})

router.get('/add', function(req, res) {
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res) {
  // Modificar para que cuando se seleccione un "Page" en particular se muestren
  // los datos asociados al mismo
  // Tu código acá:
  const { urlTitle } = req.params

  Page.findOne({
    where:{
      urlTitle
    }
  }).then(page =>{
    res.render('page', {page})
  })

});

module.exports = router;
