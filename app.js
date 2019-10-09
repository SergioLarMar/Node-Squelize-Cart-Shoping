const path = require('path');
// Express y body parser para las respuestas del body
const express = require('express');
const bodyParser = require('body-parser');
//todo lo creado en contollers, utilidades y modelos
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
//instancias express
const app = express();
//Iniciar el motor de plantillas y la carpeta que estan
app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
// crear la ruta absoluta hacia public para que sea accesible
app.use(express.static(path.join(__dirname, 'public')));
//crear usurio prueba
app.use((req, res, next) => {
  User.findById(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

//requerir la rutas de admin y shop
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//usar las routas de adminRoutes y shopsRoutes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
//usar controlador para  error 404
app.use(errorController.get404);
//definir las relaciones en sequelize de User, Product, Car y Orders
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
//relacion Cart Products many to many a traves del CarItem
Cart.belongsToMany(Product, { through: CartItem });
//relacion Products Cart many to many a traves del CarItem
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
//relacion Order Products many to many a traves del CarItem
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  //reiniciar todo el esquema de la BBDD force:true
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findById(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    return user.createCart();
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
