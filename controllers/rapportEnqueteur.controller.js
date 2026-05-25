import RapportEnqueteur from "../models/RapportEnqueteur.js";

export const createRapportEnqueteur = async (req, res) => {
  try {
    const newRapport = new RapportEnqueteur({
      declaration_at: req.body.declaration_at,
      societe: req.body.societe,            // <-- nouveau champ
      nomEnqueteur: req.body.nomEnqueteur,
      numeroSinistre: req.body.numeroSinistre,
      dateEnquete: req.body.dateEnquete,
      description: req.body.description,
      conclusion: req.body.conclusion
    });

    await newRapport.save();

    res.status(201).json(newRapport);

  } catch (err) {
    console.error("Erreur MongoDB:", err);
    res.status(500).json({ message: err.message });
  }
};