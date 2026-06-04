import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import declarationATRoutes from "./routes/declarationAT.js";
import rapportMedecinRoutes from "./routes/rapportMedecin.js";
import rapportResponsableRoutes from "./routes/rapportResponsable.js";
import rapportEnqueteurRoutes from "./routes/rapportEnqueteur.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import usersRoutes from "./routes/user.routes.js";
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://assu1-coww.vercel.app");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

dotenv.config();

const app = express();

/* =========================
   1. CORS (ABSOLU FIRST)
========================= */

app.use(cors({
  origin: "https://assu1-coww.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

/* =========================
   2. PRE-FLIGHT FIX (CRITICAL)
========================= */

app.options("*", cors());

/* =========================
   3. BODY PARSER
========================= */

app.use(express.json());

/* =========================
   4. STATIC
========================= */

app.use("/uploads", express.static("uploads"));

/* =========================
   5. MONGO DB
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté ✅"))
  .catch(err => console.error(err));

/* =========================
   6. ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/declaration-at", declarationATRoutes);
app.use("/api/rapport-medecin", rapportMedecinRoutes);
app.use("/api/rapport-responsable", rapportResponsableRoutes);
app.use("/api/rapport-enqueteur", rapportEnqueteurRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", usersRoutes);

/* =========================
   7. 404
========================= */

app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

/* =========================
   8. SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});