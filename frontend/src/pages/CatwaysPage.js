import React, { useEffect, useState } from "react";
import api from "../services/api";

function CatwaysPage() {
  const [catways, setCatways] = useState([]);
  const [newCatway, setNewCatway] = useState({ catwayNumber: "", catwayType: "short", catwayState: "" });

  useEffect(() => {
    fetchCatways();
  }, []);

  const fetchCatways = async () => {
    const res = await api.get("/catways");
    setCatways(res.data);
  };

  const addCatway = async (e) => {
    e.preventDefault();
    await api.post("/catways", newCatway);
    fetchCatways();
  };

  const deleteCatway = async (id) => {
    await api.delete(`/catways/${id}`);
    fetchCatways();
  };

  return (
    <div>
      <h2>Gestion des Catways</h2>

      <form onSubmit={addCatway} className="my-3">
        <input type="number" placeholder="Numéro" className="form-control mb-2"
          onChange={(e) => setNewCatway({ ...newCatway, catwayNumber: e.target.value })}
        />
        <select className="form-control mb-2"
          onChange={(e) => setNewCatway({ ...newCatway, catwayType: e.target.value })}>
          <option value="short">Court</option>
          <option value="long">Long</option>
        </select>
        <input type="text" placeholder="État" className="form-control mb-2"
          onChange={(e) => setNewCatway({ ...newCatway, catwayState: e.target.value })}
        />
        <button className="btn btn-primary w-100">Ajouter</button>
      </form>

      <ul className="list-group">
        {catways.map((c) => (
          <li key={c.catwayNumber} className="list-group-item d-flex justify-content-between align-items-center">
            <span>#{c.catwayNumber} ({c.catwayType}) - {c.catwayState}</span>
            <button className="btn btn-danger btn-sm" onClick={() => deleteCatway(c.catwayNumber)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CatwaysPage;