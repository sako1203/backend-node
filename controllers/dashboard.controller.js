import mongoose from "mongoose";
import DeclarationAT from "../models/DeclarationAT.js";
import RapportMedecin from "../models/RapportMedecin.js";
import RapportEnqueteur from "../models/RapportEnqueteur.js";
import RapportResponsable from "../models/RapportResponsable.js";

export const rechercherSinistre = async (req, res) => {
  try {
    const { societe } = req.query;

    console.log("🔎 société reçue:", societe || "AUCUNE (toutes les statutaires)");

    let declarations;
    
    if (societe) {
      // Si une societe est spécifiée, récupérer les déclarations pour cette societe
      declarations = await DeclarationAT.find({
        $expr: {
          $eq: [
            { $toString: "$societe" },
            societe
          ]
        }
      });
    } else {
      // Si pas de societe, récupérer TOUTES les déclarations
      declarations = await DeclarationAT.find({});
    }

    console.log("📦 résultats:", declarations.length);

    // 🔍 DEBUG: Voir tous les RapportMedecin
    const allMedecins = await RapportMedecin.find({});
    console.log("📋 TOTAL RapportMedecin en BD:", allMedecins.length);
    allMedecins.forEach(m => {
      console.log(`  - ${m.nom} ${m.prenom}, declaration_at: ${m.declaration_at}, dateAT: ${m.dateAT}`);
    });

    const result = await Promise.all(
      declarations.map(async (d) => {
        // 🔍 Buscar medecin por declaration_at 
        let medecin = await RapportMedecin.findOne({ declaration_at: d._id });
        
        // Si no encuentra por declaration_at, buscar por nom+prenom (más tolerante con dateAT)
        if (!medecin) {
          medecin = await RapportMedecin.findOne({
            nom: d.nom,
            prenom: d.prenom
          });
        }

        // Buscar otros reportes normalmente
        const enqueteur = await RapportEnqueteur.findOne({ declaration_at: d._id });
        const responsableLocal = await RapportResponsable.findOne({ declaration_at: d._id });

        console.log(`📋 Declaration ${d._id} (${d.nom} ${d.prenom}):`);
        console.log("  - Médecin:", medecin ? "✅ TROUVÉ" : "❌ VIDE");
        if (medecin) {
          console.log(`    → ID: ${medecin._id}, declaration_at: ${medecin.declaration_at}`);
        }
        console.log("  - Enquêteur:", enqueteur ? "✅ TROUVÉ" : "❌ VIDE");
        console.log("  - Responsable:", responsableLocal ? "✅ TROUVÉ" : "❌ VIDE");

        return {
          ...d.toObject(),
          medecin,
          enqueteur,
          responsableLocal
        };
      })
    );

    return res.json(result);

  } catch (err) {
    console.error("❌ erreur:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};