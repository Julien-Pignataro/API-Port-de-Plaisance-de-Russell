import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import CatwaysPage from "./pages/CatwaysPage";
import ReservationsPage from "./pages/ReservationsPage";
import ApiDoc from "./pages/ApiDoc";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/catways" element={<CatwaysPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/api-doc" element={<ApiDoc />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
