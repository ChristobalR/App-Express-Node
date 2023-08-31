
const mongoose = require('mongoose');

const initDB = async () => {
  try {
    // Conectar a la base de datos
    
    await mongoose.connect('mongodb+srv://cristobalgavilanr:xKXN3PoUcCOhX8VF@cluster0.mlkcwqi.mongodb.net/bd?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true,});
    console.log('Conexión exitosa a la base de datos');
   
   

  
   
  } catch (err) {
    console.error('Error en la conexión a la base de datos:', err);
  }
};

module.exports = initDB;