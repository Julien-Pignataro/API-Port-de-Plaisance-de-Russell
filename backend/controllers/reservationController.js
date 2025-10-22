const Reservation = require('../models/Reservation');

// Lister les réservations d’un catway
const getReservationsByCatway = async (req, res) => {
  const reservations = await Reservation.find({ catwayNumber: req.params.id });
  res.json(reservations);
};

// Détail d’une réservation
const getReservationById = async (req, res) => {
  const reservation = await Reservation.findById(req.params.idReservation);
  reservation
    ? res.json(reservation)
    : res.status(404).json({ message: 'Réservation non trouvée' });
};

// Créer une réservation
const createReservation = async (req, res) => {
  try {
    const { clientName, boatName, startDate, endDate } = req.body;
    const reservation = await Reservation.create({
      catwayNumber: req.params.id,
      clientName,
      boatName,
      startDate,
      endDate,
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création', error });
  }
};

// Modifier une réservation
const updateReservation = async (req, res) => {
  const reservation = await Reservation.findByIdAndUpdate(
    req.params.idReservation,
    req.body,
    { new: true }
  );
  reservation
    ? res.json(reservation)
    : res.status(404).json({ message: 'Réservation non trouvée' });
};

// Supprimer une réservation
const deleteReservation = async (req, res) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.idReservation);
  reservation
    ? res.json({ message: 'Réservation supprimée' })
    : res.status(404).json({ message: 'Réservation non trouvée' });
};

module.exports = {
  getReservationsByCatway,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
};