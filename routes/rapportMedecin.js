import express from "express";
import multer from "multer";
import RapportMedecin from "../models/RapportMedecin.js";
import { createRapportMedecin, getRapportsMedecins, updateRapportMedecin } from "../controllers/rapportMedecin.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/", upload.single("certificat"), createRapportMedecin);

// 🔹 Route pour lister les rapports (utilisée pour les notifications)
router.get("/", getRapportsMedecins);

// 🔹 Route pour mettre à jour un rapport médical (ex: lier à une DeclarationAT)
router.put("/:id", updateRapportMedecin);

export default router;