const express = require('express');
const router = express.Router();
const importacion = require('../controllers/index');
const path = require('path')



const verificarAdministrador = (req, res,next ) => {
if (req.session.admin == true){
  next();
  console.log(req.session.admin)
} else {
  res.redirect('/index')
  console.log(req.session.admin)
}
}

///////////// RUTAS ESTATICAS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.use('/admin',verificarAdministrador,express.static(path.join(__dirname, '..','..' ,'public', 'admin')));
router.use('/index',express.static(path.join(__dirname, '..','..' ,'public', 'index')));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/admin',importacion.isAuthenticated,verificarAdministrador, importacion.admin)
router.get('/index', importacion.isAuthenticated, importacion.index)
router.get('/postuser',importacion.postRoute )
router.post('/postuser', importacion.postUser)
router.post('/messages',importacion.isAuthenticated, importacion.mensajesPost)
router.get('/logout', importacion.logout)
router.get('/', (req,res) => res.redirect('/index'))
router.get('/slider', importacion.slider )
router.post('/loginpost', importacion.loginPost)

module.exports = router;


