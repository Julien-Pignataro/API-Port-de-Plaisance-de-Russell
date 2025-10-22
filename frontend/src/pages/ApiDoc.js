import React from "react";

function ApiDoc() {
  return (
    <div className="mt-4">
      <h2>📘 Documentation de l’API</h2>
      <ul>
        <li><code>GET /api/catways</code> → Liste tous les catways</li>
        <li><code>POST /api/catways</code> → Crée un catway</li>
        <li><code>GET /api/catways/:id</code> → Détails d’un catway</li>
        <li><code>PUT /api/catways/:id</code> → Met à jour l’état d’un catway</li>
        <li><code>DELETE /api/catways/:id</code> → Supprime un catway</li>
        <hr />
        <li><code>GET /api/users</code> → Liste des utilisateurs</li>
        <li><code>POST /api/users</code> → Crée un utilisateur</li>
        <li><code>POST /api/users/login</code> → Connexion</li>
      </ul>
    </div>
  );
}

export default ApiDoc;