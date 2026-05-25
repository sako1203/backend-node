import express from "express";
import {
  saveCertificats,
  getCertificats,
  saveQuittances,
  getQuittances,
  saveReglements,
  getReglements,
  saveDonneesBackOffice,
  getDonneesBackOffice
} from "../controllers/tableaux.controller.js";

const router = express.Router();

// Certificats
router.post("/certificats/:declaration_at", saveCertificats);
router.get("/certificats/:declaration_at", getCertificats);

// Quittances
router.post("/quittances/:declaration_at", saveQuittances);
router.get("/quittances/:declaration_at", getQuittances);

// Règlements
router.post("/reglements/:declaration_at", saveReglements);
router.get("/reglements/:declaration_at", getReglements);

// Données BackOffice
router.post("/backoffice/:declaration_at", saveDonneesBackOffice);
router.get("/backoffice/:declaration_at", getDonneesBackOffice);

export default router;
