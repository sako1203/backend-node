import RapportMedecin from "../models/RapportMedecin.js";

// 🔹 Récupérer les rapports (pour les notifications et la recherche)
export const getRapportsMedecins = async (req, res) => {
  try {
    const { societe, role } = req.query;
    
    // 🛡️ Sécurité : Évite l'erreur 500 si societe est vide ou invalide
    let filter = (societe && societe !== "" && societe !== "undefined") ? { societe } : {};

    // 🎯 Filtrage par rôle : on affiche uniquement si le service n'a pas encore traité le dossier (champ est null)
    if (role === 'service-at') {
      filter.declaration_at = null;
    } else if (role === 'responsable') {
      filter.responsable_at = null;
      filter.declaration_at = { $ne: null }; // Le Service AT doit avoir traité le dossier
    } else if (role === 'enqueteur') {
      filter.enqueteur_at = null;
      filter.declaration_at = { $ne: null }; // Le Service AT doit avoir traité le dossier
    } else {
      // Par défaut (accueil), on ne montre que les nouveaux dossiers non encore déclarés
      filter.declaration_at = null;
    }
    
    // On trie par date de création (le plus récent en premier)
    const rapports = await RapportMedecin.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json(rapports);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des rapports", error: err.message });
  }
};

// 🔹 Mettre à jour un rapport médical
export const updateRapportMedecin = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 🛡️ Vérification ID pour éviter CastError
    if (id === "undefined" || id === "") {
        return res.status(400).json({ message: "ID manquant ou invalide" });
    }

    const updatedRapport = await RapportMedecin.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRapport) return res.status(404).json({ message: "Rapport médical non trouvé" });
    res.status(200).json(updatedRapport);
  } catch (err) {
    console.error("❌ Erreur lors de la mise à jour du Rapport Médical :", err);
    res.status(500).json({ message: "Erreur lors de la mise à jour du rapport", error: err.message });
  }
};

export const createRapportMedecin = async (req, res) => {
  try {
    console.log("📥 Données reçues (Formulaire Médecin) :", req.body);

    const data = {
      ...req.body,
      // Normalisation des champs pour éviter les erreurs de validation de noms
      nom: req.body.nomVictime || req.body.nom || "",
      prenom: req.body.prenomVictime || req.body.prenom || "",
      // On s'assure que les types de blessure sont bien mappés
      typeBlessure: req.body.typeLesion || req.body.typeBlessure,
      typeLesion: req.body.typeLesion || req.body.typeBlessure
    };

    // 🔥 FIX ERREUR 500 : Supprimer les champs ObjectId vides pour éviter les erreurs de cast
    if (data.declaration_at === "") delete data.declaration_at;
    if (data.responsable_at === "") delete data.responsable_at;
    if (data.enqueteur_at === "") delete data.enqueteur_at;
    if (data.societe === "") delete data.societe;
    
    // Gestion de l'upload du certificat
    if (req.file) {
      data.certificat = req.file.filename;
    }

    console.log("💾 DATA A SAUVEGARDER:", data);

    const newRapport = new RapportMedecin(data);
    await newRapport.save();

    console.log("✅ RapportMedecin créé:", newRapport._id);
    console.log("   - declaration_at:", newRapport.declaration_at);
    console.log("   - nom:", newRapport.nom);
    console.log("   - prenom:", newRapport.prenom);

    return res.status(201).json({
      message: "Rapport médical enregistré avec succès",
      data: newRapport
    });

  } catch (err) {
    console.error("❌ Erreur lors de la création du Rapport Médical :", err);
    return res.status(500).json({ 
      message: "Erreur de validation de la base de données", 
      error: err.message 
    });
  }
};