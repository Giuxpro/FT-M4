const { categories } = require('.');
const { Page, Category } = require('../models');
const router = require('express').Router();

router.get('/', function(req, res) {
  // Modificar para devolver los datos de todas las categorias existentes
  // Tu código acá:
  Category.findAll().then(categories => res.status(200).json(categories))

});

router.get('/:idCategory', function(req, res) {
  // Modificar para que cuando se seleccione una "Category" en particular se muestren
  // todas las páginas que estén dentro de dicha categoría
  // Tu código acá:
  const { idCategory } = req.params
  Category.findByPk(idCategory, {
    include: Page
  }).then(categories => res.status(200).json(categories))
});

module.exports = router;
