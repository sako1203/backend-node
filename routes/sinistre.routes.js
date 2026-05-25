import express from "express";
import Sinistre from "../models/Sinistre.js";

const router = express.Router();

// 🔹 Récupérer tous les formulaires d'un numéro de dossier
router.get("/:dossierNumber", async (req, res) => {
  const { dossierNumber } = req.params;
  try {
    const forms = await Sinistre.find({ dossierNumber });
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;