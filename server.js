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

/* =========================
   CORS FIX (IMPORTANT)
========================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://assu1-coww.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow mobile apps / postman (no origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS blocked"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// IMPORTANT: preflight requests
app.options("*", cors());

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* =========================
   MONGODB CONNECTION
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté ✅"))
  .catch(err => console.error("Erreur MongoDB:", err));

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/declaration-at", declarationATRoutes);
app.use("/api/rapport-medecin", rapportMedecinRoutes);
app.use("/api/rapport-responsable", rapportResponsableRoutes);
app.use("/api/rapport-enqueteur", rapportEnqueteurRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", usersRoutes);

/* =========================
   TEST ROUTE
========================= */

app.post("/test", (req, res) => {
  console.log("Test route hit:", req.body);
  res.json({ message: "Test OK" });
});

/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});