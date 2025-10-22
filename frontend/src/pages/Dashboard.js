import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const userEmail = "capitainerie@russell.com";
  const today = new Date().toLocaleDateString();

  return (
    <div className="text-center">
      <h2>Tableau de bord</h2>
      <p>👤 Connecté en tant que : {userEmail}</p>
      <p>📅 Date du jour : {today}</p>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/users" className="btn btn-outline-primary">Utilisateurs</Link>
        <Link to="/catways" className="btn btn-outline-success">Catways</Link>
        <Link to="/reservations" className="btn btn-outline-warning">Réservations</Link>
      </div>
    </div>
  );
}

export default Dashboard;