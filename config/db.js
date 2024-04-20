const mongoose = require("mongoose");
require("dotenv").config();

const initDB = async () => {
  try {
    const dbConnectionUrl = process.env.MONGODB_URI;
    await mongoose.connect(dbConnectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Conexión exitosa a la base de datos");
  } catch (err) {
    console.error("Error en la conexión a la base de datos:", err);
  }
};

module.exports = initDB;
