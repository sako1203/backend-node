// routes/rapportResponsable.js
import express from "express";
import RapportResponsable from "../models/RapportResponsable.js"; // ton modèle Mongoose
const router = express.Router();

// Créer un rapport
router.post("/", async (req, res) => {
  try {
    const rapport = await RapportResponsable.create(req.body);
    res.status(201).json(rapport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création du rapport" });
  }
});

export default router;