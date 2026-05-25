import express from "express";
import { createRapportEnqueteur } from "../controllers/rapportEnqueteur.controller.js";

const router = express.Router();

// 🔹 Créer un rapport enquêteur
router.post("/", createRapportEnqueteur); // POST sur "/" suffit

export default router;