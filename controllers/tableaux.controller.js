import CertificatMedical from "../models/CertificatMedical.js";
import Quittance from "../models/Quittance.js";
import Reglement from "../models/Reglement.js";
import DonneesBackOffice from "../models/DonneesBackOffice.js";

// ========================
// CERTIFICATS
// ========================
export const saveCertificats = async (req, res) => {
  try {
    const { declaration_at } = req.params;
    const { certificats } = req.body;

    // Supprimer les anciens certificats
    await CertificatMedical.deleteMany({ declaration_at });

    // Sauvegarder les nouveaux
    const savedCertificats = await Promise.all(
      certificats.map(cert =>
        new CertificatMedical({
          declaration_at,
          ...cert
        }).save()
      )
    );

    res.json({ message: "✅ Certificats sauvegardés", data: savedCertificats });
  } catch (error) {
    console.error("❌ Erreur sauvegarde certificats:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getCertificats = async (req, res) => {
  try {
    const { declaration_at } = req.params;
    const certificats = await CertificatMedical.find({ declaration_at }).sort({ createdAt: 1 });
    res.json(certificats);
  } catch (error) {
    console.error("❌ Erreur lecture certificats:", error);
    res.status(500).json({ error: error.message });
  }
};

// ========================
// QUITTANCES
// ========================
export const saveQuittances = async (req, res) => {
  try {
    const { declaration_at } = req.params;
    const { quittances } = req.body;

    // Supprimer les anciennes quittances
    await Quittance.deleteMany({ declaration_at });

    // Sauvegarder les nouvelles
    const savedQuittances = await Promise.all(
      quittances.map(quittance =>
        new Quittance({
          declaration_at,
          ...quittance
        }).save()
      )
    );

    res.json({ message: "✅ Quittances sauvegardées", data: savedQuittances });
  } catch (error) {
    console.error("❌ Erreur sauvegarde quittances:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getQuittances = async (req, res) => {
  try {
    const { declaration_at } = req.params;
    const quittances = await Quittance.find({ declaration_at }).sort({ createdAt: 1 });
    res.json(quittances);
  } catch (error) {
    console.error("❌ Erreur lecture quittances:", error);
    res.status(500).json({ error: error.message });
  }
};

// ========================
// REGLEMENTS
// ========================
export const saveReglements = async (req, res) => {
  try {
    const { declaration_at } = req.params;
    const { reglements } = req.body;

    // Supprimer les anciens règlements
    await Reglement.deleteMany({ declaration_at });

    // Sauvegarder les nouveaux
    const savedReglements = await Promise.all(
      reglements.map(reglement =>
        new Reglement({
          declaration_at,
          ...reglement
        }).save()
      )
    );

    res.json({ message: "✅ Règlements sauvegardés", data: savedReglements });
  } catch (error) {
    console.error("❌ Erreur sauvegarde règlements:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getReglements = async (req, res) => {
  try {
    const { declaration_at } = req.params;
    const reglements = await Reglement.find({ declaration_at }).sort({ createdAt: 1 });
    res.json(reglements);
  } catch (error) {
    console.error("❌ Erreur lecture règlements:", error);
    res.status(500).json({ error: error.message });
  }
};

// ========================
// DONNEES BACKOFFICE
// ========================
export const saveDonneesBackOffice = async (req, res) => {
  try {
    const { declaration_at } = req.params;
    const { section, donnees, montantTotalVerse, tauxIPP } = req.body;

    // Chercher si existe déjà
    let backofficeData = await DonneesBackOffice.findOne({ declaration_at, section });

    if (backofficeData) {
      // Mettre à jour
      backofficeData.donnees = donnees;
      backofficeData.montantTotalVerse = montantTotalVerse;
      backofficeData.tauxIPP = tauxIPP;
      backofficeData.updatedAt = new Date();
      await backofficeData.save();
    } else {
      // Créer nouveau
      backofficeData = new DonneesBackOffice({
        declaration_at,
        section,
        donnees,
        montantTotalVerse,
        tauxIPP
      });
      await backofficeData.save();
    }

    res.json({ message: "✅ Données BackOffice sauvegardées", data: backofficeData });
  } catch (error) {
    console.error("❌ Erreur sauvegarde backoffice:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getDonneesBackOffice = async (req, res) => {
  try {
    const { declaration_at } = req.params;
    const backofficeDonnees = await DonneesBackOffice.find({ declaration_at });
    res.json(backofficeDonnees);
  } catch (error) {
    console.error("❌ Erreur lecture backoffice:", error);
    res.status(500).json({ error: error.message });
  }
};
