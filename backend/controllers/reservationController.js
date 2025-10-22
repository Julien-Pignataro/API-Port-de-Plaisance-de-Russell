const Reservation = require("../models/Reservation");

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

const createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: "Erreur création réservation", error: error.message });
  }
};

const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: "Erreur mise à jour réservation", error: error.message });
  }
};

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