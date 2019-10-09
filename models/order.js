// se trae Sequilize para iniciar el objeto
const Sequelize = require('sequelize');
//conexion a la BBDD
const sequelize = require('../util/database');

const Order = sequelize.define('order', {
  id: {
    //Tipo integer,autoincremento, no nulo y clave primaria
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Order;
