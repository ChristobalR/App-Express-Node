const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path')
const { Messages, Usuarios, Products } = require('./app/models/user.js')

const routes = require('./app/routes/index')
const initDB = require('./config/db');

const app = express();
const port = 3001;
initDB();

////////////////////////////////////////////////////// TEST ////////////////////////////////////////////////////////////


const newProduct = new Products({
  descripcion: 'Descripción del nuevo producto',
  price: 29.99,
  urlimg: 'URL de la imagen del producto',
  ubi: 'Ubicación del producto',
  stock: 10
  // Otros campos del producto si los tienes...
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



app.set('view engine', 'ejs');
app.set('views', './views');


app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'Ch32z23',
  resave: false,
  saveUninitialized: true,
}));

app.use('/',routes);

app.listen(port, () => {
  console.log('La aplicación está en línea');
});

