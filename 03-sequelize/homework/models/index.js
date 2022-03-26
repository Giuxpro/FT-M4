var Sequelize = require('sequelize');
const S = Sequelize;
var db = new Sequelize('postgres://postgres:1234@localhost:5432/henryblog', {
  logging: false,
});

// title*: El título de la página
// urlTitle*: La URL que vamos a utilizar para acceder a la información de una página a través de los links (Debe ser una URL válida).
// content*: El contenido de la página
// status: Estado actual de la página (Puede ser open o closed)
// route: url de la ruta

const Page = db.define('page', {
  // Tu código acá:
  title:{
    type: S.DataTypes.STRING,
    allowNull: false
  },
  urlTitle:{
    type: S.DataTypes.STRING,
    allowNull: false,
  },
  content:{
    type: S.DataTypes.TEXT,
    allowNull: false,
  },
  status:{
    type: S.DataTypes.ENUM('open', 'closed')
  },
  route:{
    type: S.DataTypes.VIRTUAL,
    get(){
        return '/pages/' + this.getDataValue('urlTitle')
    }
  }


});

// .addHook() method
Page.beforeValidate( page =>{
  return page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '')
})

// name*: Nombre completo del usuario
// email*: Email del usuario (Debe ser único)
const User = db.define('users', {
  name:{
    type: S.DataTypes.STRING,
    allowNull: false
  },
  email:{
    type: S.DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
});

// name*: Nombre de la categoría (Debe ser único)
// description: Descripción de la categoría
const Category = db.define('category', {
  // Tu código acá:
  name:{
    type: S.DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description:{
    type: S.DataTypes.TEXT,
  } 
    
});

// Vincular User con Page
// Tu código acá:
User.hasMany(Page);
Page.belongsTo(User);

Page.belongsToMany(Category, {through: 'page_categories'});
Category.belongsToMany(Page, {through: 'page_categories'});

module.exports = {
  User,
  Page,
  Category,
  db
}
