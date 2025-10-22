const Catway = require('../models/Catway');

// Lister tous les catways
const getAllCatways = async (req, res) => {
  const catways = await Catway.find();
  res.json(catways);
};

// Obtenir un catway par ID
const getCatwayById = async (req, res) => {
  const catway = await Catway.findOne({ catwayNumber: req.params.id });
  catway ? res.json(catway) : res.status(404).json({ message: 'Catway non trouvé' });
};

// Créer un catway
const createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;
    const catwayExists = await Catway.findOne({ catwayNumber });
    if (catwayExists) return res.status(400).json({ message: 'Ce catway existe déjà' });

    const catway = await Catway.create({ catwayNumber, catwayType, catwayState });
    res.status(201).json(catway);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création', error });
  }
};

// Modifier uniquement l’état d’un catway
const updateCatway = async (req, res) => {
  const catway = await Catway.findOne({ catwayNumber: req.params.id });
  if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });

  catway.catwayState = req.body.catwayState || catway.catwayState;
  const updated = await catway.save();
  res.json(updated);
};

// Supprimer un catway
const deleteCatway = async (req, res) => {
  const catway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
  catway ? res.json({ message: 'Catway supprimé' }) : res.status(404).json({ message: 'Catway non trouvé' });
};

module.exports = {
  getAllCatways,
  getCatwayById,
  createCatway,
  updateCatway,
  deleteCatway,
};