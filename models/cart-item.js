// se trae Sequilize para iniciar el objeto
const Sequelize = require('sequelize');
//conexion a la BBDD
const sequelize = require('../util/database');
// Se define la tabla y sus tipos
const CartItem = sequelize.define('cartItem', {
  id: {
    //Tipo integer,autoincremento, no nulo y clave primaria
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = CartItem;
