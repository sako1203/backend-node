import Societe from "../models/societe.js";

// 🔹 Ajouter une société
export const createSociete = async (req, res) => {
  try {
    const { nomSociete, adresse, contact } = req.body;

    if (!nomSociete) {
      return res.status(400).json({ message: "Le nom de la société est requis" });
    }

    const societe = new Societe({ nomSociete, adresse, contact });
    await societe.save();

    res.status(201).json(societe);
  } catch (err) {
    console.error("Erreur création société :", err);
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Lister toutes les sociétés
export const getAllSocietes = async (req, res) => {
  try {
    const societes = await Societe.find({});
    res.json(societes);
  } catch (err) {
    console.error("Erreur récupération sociétés :", err);
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Supprimer une société (optionnel)
export const deleteSociete = async (req, res) => {
  try {
    const { id } = req.params;
    await Societe.findByIdAndDelete(id);
    res.json({ message: "Société supprimée" });
  } catch (err) {
    console.error("Erreur suppression société :", err);
    res.status(500).json({ message: err.message });
  }
};