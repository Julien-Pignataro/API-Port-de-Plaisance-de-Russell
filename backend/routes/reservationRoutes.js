const express = require('express');
const router = express.Router();
const {
  getReservationsByCatway,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} = require('../controllers/reservationController');

router.get('/:id/reservations', getReservationsByCatway);
router.get('/:id/reservations/:idReservation', getReservationById);
router.post('/:id/reservations', createReservation);
router.put('/:id/reservations/:idReservation', updateReservation);
router.delete('/:id/reservations/:idReservation', deleteReservation);

module.exports = router;