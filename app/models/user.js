const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define el esquema del modelo de usuario
const usuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  admin: {type: Boolean, required: true, default: false}
  
  // Otros campos del usuario si los tienes...
});
const messageSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
const productSchema = new mongoose.Schema({
  
  descripcion: { type: String, required: true },
  price: { type: Number, required: true },
  urlimg: {type: String, required: true},
  ubi: {type: String, required: true},
  stock: {type: Number, required: true}
});

// Antes de guardar un nuevo usuario, hashea la contraseña
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) {
    return next();
  }

  try {
    const hash = await bcrypt.hash(this.passwordHash, 10);
    this.passwordHash = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

// Crea el modelo de usuario a partir del esquema
const Usuarios = mongoose.model('Usuarios', usuarioSchema);
const Message = mongoose.model('BandejaMensajes', messageSchema);
const Products = mongoose.model('Products', productSchema);





module.exports = {
  Usuarios: Usuarios,
  Message: Message,
  Products: Products,
};