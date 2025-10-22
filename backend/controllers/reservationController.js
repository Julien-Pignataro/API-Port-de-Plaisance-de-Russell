const Reservation = require("../models/Reservation");

// GET /api/reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// POST /api/reservations
const createReservation = async (req, res) => {
  try {
    const newReservation = await Reservation.create(req.body);
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: "Erreur création réservation", error: error.message });
  }
};

// PUT /api/reservations/:id
const updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: "Erreur mise à jour réservation", error: error.message });
  }
};

// DELETE /api/reservations/:id
const deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Réservation supprimée" });
  } catch (error) {
    res.status(400).json({ message: "Erreur suppression réservation", error: error.message });
  }
};

module.exports = {
  getAllReservations,
  createReservation,
  updateReservation,
  deleteReservation,
};