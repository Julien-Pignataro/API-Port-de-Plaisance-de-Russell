import React, { useEffect, useState } from "react";
import api from "../services/api";

function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({
    catwayNumber: "",
    clientName: "",
    boatName: "",
    startDate: "",
    endDate: "",
  });

  // Charger les réservations
  const fetchReservations = async () => {
    const res = await api.get("/reservations");
    setReservations(res.data);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // Ajouter une réservation
const addReservation = async (e) => {
  e.preventDefault();
  try {
    await api.post("/reservations", newReservation);
    fetchReservations();
    setNewReservation({
      catwayNumber: "",
      clientName: "",
      boatName: "",
      startDate: "",
      endDate: "",
    });
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la création de la réservation");
  }
};

  // Supprimer une réservation
 const deleteReservation = async (idReservation) => {
  await api.delete(`/reservations/${idReservation}`);
  fetchReservations();
};

  return (
    <div>
      <h2>📅 Gestion des Réservations</h2>

      <form onSubmit={addReservation} className="my-4">
        <input
          type="number"
          placeholder="Numéro de Catway"
          className="form-control mb-2"
          value={newReservation.catwayNumber}
          onChange={(e) => setNewReservation({ ...newReservation, catwayNumber: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nom du client"
          className="form-control mb-2"
          value={newReservation.clientName}
          onChange={(e) => setNewReservation({ ...newReservation, clientName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nom du bateau"
          className="form-control mb-2"
          value={newReservation.boatName}
          onChange={(e) => setNewReservation({ ...newReservation, boatName: e.target.value })}
        />
        <input
          type="date"
          className="form-control mb-2"
          value={newReservation.startDate}
          onChange={(e) => setNewReservation({ ...newReservation, startDate: e.target.value })}
        />
        <input
          type="date"
          className="form-control mb-3"
          value={newReservation.endDate}
          onChange={(e) => setNewReservation({ ...newReservation, endDate: e.target.value })}
        />
        <button className="btn btn-primary w-100">Créer la réservation</button>
      </form>

      <ul className="list-group">
        {reservations.map((r) => (
          <li key={r._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              Catway #{r.catwayNumber} – {r.boatName} ({r.clientName})
              <br />
              {new Date(r.startDate).toLocaleDateString()} ➡️ {new Date(r.endDate).toLocaleDateString()}
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteReservation( r._id)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReservationsPage;