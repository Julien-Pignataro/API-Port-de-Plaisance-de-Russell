import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Identifiants incorrects");
    }
  };

  return (
    <div className="text-center mt-5">
      <h1 className="mb-3">🏖️ Port de Plaisance Russell</h1>
      <p className="mb-4">Gérez vos catways, réservations et utilisateurs facilement</p>
      <form onSubmit={handleLogin} className="w-50 mx-auto">
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100" type="submit">Connexion</button>
      </form>

      <div className="mt-4">
        <a href="/api-doc" className="btn btn-outline-info">📘 Documentation API</a>
      </div>
    </div>
  );
}

export default Home;