// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/auth.routes.js";
import declarationATRoutes from "./routes/declarationAT.js";
import rapportMedecinRoutes from "./routes/rapportMedecin.js";
import rapportResponsableRoutes from "./routes/rapportResponsable.js";
import rapportEnqueteurRoutes from "./routes/rapportEnqueteur.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import usersRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// -------------------------
// Connexion MongoDB
// -------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté ✅"))
  .catch(err => console.error("Erreur MongoDB:", err));

// -------------------------
// Routes
// -------------------------
app.use("/api/auth", authRoutes);
app.use("/api/declaration-at", declarationATRoutes);
app.use("/api/rapport-medecin", rapportMedecinRoutes);
app.use("/api/rapport-responsable", rapportResponsableRoutes);
app.use("/api/rapport-enqueteur", rapportEnqueteurRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", usersRoutes);

// -------------------------
// Route test
// -------------------------
app.post("/test", (req, res) => {
  console.log("Test route hit:", req.body);
  res.json({ message: "Test OK" });
});

// -------------------------
// Gestion erreurs 404
// -------------------------
app.use((req, res, next) => {
  res.status(404).json({ error: "Route non trouvée" });
});

// -------------------------
// Lancement serveur
// -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});