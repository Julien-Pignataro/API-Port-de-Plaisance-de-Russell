import React, { useEffect, useState } from "react";
import api from "../services/api";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });

  // Charger les utilisateurs
  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Ajouter un utilisateur
  const addUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", newUser);
      fetchUsers();
      setNewUser({ username: "", email: "", password: "" });
    } catch (error) {
      alert("Erreur lors de la création de l'utilisateur");
    }
  };

  // Supprimer un utilisateur
  const deleteUser = async (email) => {
    await api.delete(`/users/${email}`);
    fetchUsers();
  };

  return (
    <div>
      <h2>👤 Gestion des Utilisateurs</h2>

      <form onSubmit={addUser} className="my-4">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="form-control mb-2"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="form-control mb-3"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button className="btn btn-primary w-100">Ajouter un utilisateur</button>
      </form>

      <ul className="list-group">
        {users.map((user) => (
          <li key={user.email} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{user.username} - {user.email}</span>
            <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.email)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;