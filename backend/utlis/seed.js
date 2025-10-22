// utils/seed.js
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Catway = require('../models/Catway');
const Reservation = require('../models/Reservation');
const connectDB = require('../config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Lecture des fichiers JSON
    const catways = JSON.parse(fs.readFileSync(`${__dirname}/data/catways.json`, "utf-8"));
    const reservations = JSON.parse(fs.readFileSync(`${__dirname}/data/reservations.json`, "utf-8"));

    // Nettoyage de la base
    await Catway.deleteMany();
    await Reservation.deleteMany();

    // Insertion des données
    await Catway.insertMany(catways);
    await Reservation.insertMany(reservations);

    console.log('✅ Données importées avec succès !');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur lors de l’importation :', error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Catway.deleteMany();
    await Reservation.deleteMany();
    console.log('🗑️ Données supprimées !');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur lors de la suppression :', error);
    process.exit(1);
  }
};

// Choix de la commande
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}