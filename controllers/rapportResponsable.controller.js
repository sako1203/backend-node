import RapportResponsable from "../models/RapportResponsable.js";

// 🔹 Créer un rapport responsable
export const createRapportResponsable = async (req, res) => {
  try {
    const newRapport = new RapportResponsable(req.body);
    await newRapport.save(); // save dans MongoDB

    res.status(201).json(newRapport);
  } catch (err) {
    console.error("Erreur MongoDB:", err);
    res.status(500).json({ message: err.message });
  }
};