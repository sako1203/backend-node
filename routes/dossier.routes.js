import express from "express";
import Dossier from "../models/Dossier.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const dossiers = await Dossier.find();
    res.json(dossiers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;