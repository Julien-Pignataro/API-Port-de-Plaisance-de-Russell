const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const catwayRoutes = require("./routes/catwayRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware global
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" })); // autorise le front React
app.use(morgan("dev"));

// ✅ Route racine test
app.get("/", (req, res) => {
  res.status(200).send("Bienvenue sur l’API du Port de Plaisance Russell 🚤");
});

// ✅ Routes principales de l’API
app.use("/api/users", userRoutes);
app.use("/api/catways", catwayRoutes);
app.use("/api/reservations", reservationRoutes);

// Middleware global d’erreur (évite les 403/500 silencieux)
app.use((err, req, res, next) => {
  console.error("Erreur serveur :", err.message);
  res.status(500).json({ message: "Erreur serveur interne", error: err.message });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});