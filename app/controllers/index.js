const { Message, Usuarios, Products } = require('../models/user');
const path = require('path')
const bcrypt = require('bcrypt');
const fs = require('fs');




 
  function formatNumber(number) {
  return new Intl.NumberFormat('es-CL').format(number);
}




function generarProductosHTML(productos) {
  if (!Array.isArray(productos)) {
 
    console.error('La variable productos no es un arreglo');
    return ''; 
  }

  let productosHTML = '';

  productos.forEach(producto => {
    productosHTML += `
      <div class="grid-item">
        <div class="img-products item1" style="background-image: url('${producto.urlimg}');"></div>
        <div class="text-products">
          <p class="p1-text-products">$${formatNumber(producto.price)}</p>
          <p class="p2-text-products">${producto.descripcion}</p>
          <p class="p3-text-products">${producto.ubi}</p>
        </div>
      </div>
    `;
  });

  return productosHTML;
}



const isAuthenticated = (req, res, next) => {
  if (req.session.authenticated === true) {
    // Si el usuario está autenticado, cargamos la información del usuario en req.user
    req.user = {
      _id: req.session.userId,
    };
  }

  next();
};

const admin = (req,res) => {
  res.render('admin')
}
const loginRoute = (req, res) => {
  if (req.session.authenticated === true) {
    // Si req.session.authenticated es exactamente igual a true,
    // redirige a la ruta '/index'.
    res.redirect('/index');
  } else {
    // Si req.session.authenticated es false o cualquier otro valor falsy,
    // muestra la página de inicio de sesión.
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'login.html'));
  }
};
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al destruir la sesión:', err);
    }
    res.redirect('/index');
  });
};
const postRoute = (req,res) => {
  if (req.session.authenticated === true) {
    // Si req.session.authenticated es exactamente igual a true,
    // redirige a la ruta '/index'.
    res.redirect('/index');
  } else {
    // Si req.session.authenticated es false o cualquier otro valor falsy,
    // muestra la página de inicio de sesión.
    res.sendFile(path.join(__dirname,'..','..','public','postuser.html'));
  }
}
const loginPost = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Buscar al usuario por su nombre de usuario en la base de datos (usando Async/Await)
    const user = await Usuarios.findOne({ name });

    if (user) {
      // Verificar si la contraseña coincide utilizando bcrypt.compare
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);

      if (passwordMatch) {
        // Autenticación exitosa: establecer la sesión y redirigir al dashboard
        if(user.admin == true){
          req.session.admin = true
          console.log('Se ha logeado un administrador')
        }
        req.session.authenticated = true;
        req.session.nombreUsuario = user.name; // Almacena el nombre de usuario en la sesión
        req.session.userId = user._id; // Asigna el ID del usuario a req.session.userId
        req.session.pass = user.passwordHash
        res.redirect('/index');
      } else {
        // Autenticación fallida: redirigir al formulario de inicio de sesión nuevamente
        res.redirect('/index');
        console.log('fail');
      }
    } else {
      // Usuario no encontrado: redirigir al formulario de inicio de sesión nuevamente
      res.redirect('/index');
      console.log('fail');
    }
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    res.redirect('/index');
  }
};
const index = async (req, res) => {
  try {
    const messages = await Message.find().populate('author', 'name'); // Modificado para obtener solo el campo 'name' del autor
    const ip = req.ip;
    const userAgent = req.get('user-agent');
    const nombreUsuario = req.session.nombreUsuario || 'Invitado';
    const pass2 = req.session.pass;
    const productoss = await Products.find()
    const productosHTML = generarProductosHTML(productoss);
    const perfil = req.session.authenticated
    
    const data = {
      perfil: perfil,
      ip: ip,
      userAgent: userAgent,
      nombreUsuario: nombreUsuario,
      pass2: pass2,
      productoss: productoss,
      productosHTML: productosHTML




      

    };

   
    
    
    res.render('index', data);
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    res.status(500).send('Error al obtener mensajes');
  }
};
const postUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Crea un nuevo usuario con los datos proporcionados
    const nuevoUsuario = new Usuarios({
      name,
      passwordHash: password, // Aquí no se hace el hasheo, solo se guarda la contraseña como se proporciona en texto plano
      
    });

    // Guarda el nuevo usuario en la base de datos
    await nuevoUsuario.save();

    res.send('Usuario creado exitosamente.');
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).send('Error al crear el usuario.');
  }
};
const mensajesPost = async (req, res) => {
  const { content } = req.body;

  try {
    // Verifica si req.user está definido y si tiene la propiedad _id antes de acceder a ella
    console.log('req.user:', req.user);
const authorId = req.user && req.user._id ? req.user._id : null;
console.log('authorId:', authorId);

    if (!authorId) {
      // Si no se encuentra el autor, puedes enviar un mensaje de error o redireccionar a una página de error
      console.error('Autor no encontrado en la solicitud');
      res.status(400).send('Autor no encontrado en la solicitud');
      return; // Sal del controlador para evitar continuar con el proceso de guardar el mensaje
    }

    // Crea un nuevo mensaje usando el modelo Message y asigna el ID del autor al campo 'author'
    const nuevoMensaje = new Message({ content, author: authorId });
    await nuevoMensaje.save();

    console.log('Mensaje guardado:', nuevoMensaje);

    // Redirecciona a la página principal o a donde desees después de enviar el mensaje
    res.redirect('/');
  } catch (error) {
    console.error('Error al guardar el mensaje:', error);
    res.status(500).send('Error al guardar el mensaje');
  }
};

const slider = async (req,res) => {
  res.sendFile(path.join(__dirname,'..','..','public','index','slider.html'));
}

module.exports = {
  index,
  loginPost,
  loginRoute,
  postUser,
  postRoute,
  logout,
  mensajesPost,
  isAuthenticated,
  admin,
  slider
}

