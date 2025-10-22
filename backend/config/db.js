const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URL_MONGO);
    console.log(`✅ MongoDB connecté : ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Erreur MongoDB : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;