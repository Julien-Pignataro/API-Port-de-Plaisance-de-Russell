const express = require("express");
const router = express.Router();
const {
  getAllReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController");

// Lire toutes les réservations
router.get("/", getAllReservations);

// Ajouter une réservation
router.post("/", createReservation);

// Modifier une réservation
router.put("/:id", updateReservation);

// Supprimer une réservation
router.delete("/:id", deleteReservation);

module.exports = router;