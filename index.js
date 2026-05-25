import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import declarationATRoutes from "./routes/declarationAT.js";
import sinistreRoutes from "./routes/sinistre.routes.js";
import rapportEnqueteurRoutes from "./routes/rapportEnqueteur.js";
import rapportMedecinRoutes from "./routes/rapportMedecin.js"; // ✅ corrigé
import rapportResponsableRoutes from "./routes/rapportResponsable.js"; // ← ajouté
import societeRoutes from "./routes/societe.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import tableauxRoutes from "./routes/tableaux.routes.js";



// Models
import User from "./models/User.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connecté");

    const adminExists = await User.findOne({ username: "admin" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        username: "admin",
        password: hashedPassword,
        role: "admin"
      });
      console.log("✅ Admin créé !");
    } else {
      console.log("ℹ️ Admin existe déjà");
    }
  })
  .catch(err => console.error("Erreur MongoDB:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/declaration-at", declarationATRoutes);
app.use("/api/sinistres", sinistreRoutes);
app.use("/api/rapport-enqueteur", rapportEnqueteurRoutes);
app.use("/api/rapport-medecin", rapportMedecinRoutes);
app.use("/api/rapport-responsable", rapportResponsableRoutes);
app.use("/api/societe", societeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tableaux", tableauxRoutes);

// Test
app.get("/", (req, res) => {
  res.send("Backend OK ✅");
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});