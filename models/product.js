// se trae Sequilize para iniciar el objeto
const Sequelize = require('sequelize');
//conexion a la BBDD
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    //Tipo integer,autoincremento, no nulo y clave primaria
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;
