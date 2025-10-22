const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Génère un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Créer un utilisateur
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Cet email existe déjà' });

    const user = await User.create({ username, email, password });
    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: { id: user._id, username, email },
    });
  } catch (error) {
    console.error("Erreur création utilisateur :", error.message);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Connexion
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        message: 'Connexion réussie',
        token: generateToken(user._id),
        user: { id: user._id, username: user.username, email: user.email },
      });
    } else {
      res.status(401).json({ message: 'Identifiants incorrects' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Déconnexion
const logoutUser = (req, res) => {
  res.json({ message: 'Utilisateur déconnecté avec succès' });
};

// Obtenir tous les utilisateurs
const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// Obtenir un utilisateur par email
const getUserByEmail = async (req, res) => {
  const user = await User.findOne({ email: req.params.email }).select('-password');
  user ? res.json(user) : res.status(404).json({ message: 'Utilisateur non trouvé' });
};

// Mettre à jour un utilisateur
const updateUser = async (req, res) => {
  const user = await User.findOneAndUpdate({ email: req.params.email }, req.body, { new: true });
  user ? res.json(user) : res.status(404).json({ message: 'Utilisateur non trouvé' });
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  const user = await User.findOneAndDelete({ email: req.params.email });
  user ? res.json({ message: 'Utilisateur supprimé' }) : res.status(404).json({ message: "Utilisateur non trouvé" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
};