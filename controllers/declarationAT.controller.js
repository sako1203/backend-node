import DeclarationAT from "../models/DeclarationAT.js";

// Créer une déclaration
export const createDeclaration = async (req, res) => {
  try {
    const declaration = new DeclarationAT(req.body);
    await declaration.save();
    res.status(201).json(declaration);
  } catch (err) {
    console.error("Erreur création Déclaration AT :", err);
    res.status(500).json({ error: err.message });
  }
};

// Récupérer toutes les déclarations
export const getAllDeclarations = async (req, res) => {
  try {
    const { societe } = req.query;
    
    let query = {};
    if (societe) {
      // Filtrer par société si fournie
      query = {
        $expr: {
          $eq: [
            { $toString: "$societe" },
            societe
          ]
        }
      };
      console.log("🔎 Recherche déclarations pour societe:", societe);
    } else {
      console.log("🔎 Recherche TOUTES les déclarations");
    }
    
    const declarations = await DeclarationAT.find(query, "nom prenom societe dateAT");
    console.log("📦 Déclarations trouvées:", declarations.length);
    res.json(declarations);
  } catch (err) {
    console.error("Erreur récupération déclarations :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer une déclaration par ID
export const getDeclarationById = async (req, res) => {
  try {
    const declaration = await DeclarationAT.findById(req.params.id);
    if (!declaration) {
      return res.status(404).json({ message: "Déclaration non trouvée" });
    }
    res.json(declaration);
  } catch (err) {
    console.error("Erreur récupération déclaration :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Mettre à jour une déclaration
export const updateDeclaration = async (req, res) => {
  try {
    console.log('DEBUG updateDeclaration request body:', req.body);
    console.log('DEBUG certificats type:', typeof req.body.certificats, 'isArray:', Array.isArray(req.body.certificats));
    console.log('DEBUG quittances type:', typeof req.body.quittances, 'isArray:', Array.isArray(req.body.quittances));
    console.log('DEBUG reglements type:', typeof req.body.reglements, 'isArray:', Array.isArray(req.body.reglements));

    const safeParse = (value) => {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch (error) {
          try {
            return Function('"use strict"; return (' + value + ')')();
          } catch (innerError) {
            return value;
          }
        }
      }
      return value;
    };

    const updateData = {};

    if (req.body.certificats !== undefined) {
      updateData.certificats = safeParse(req.body.certificats);
    }
    if (req.body.quittances !== undefined) {
      updateData.quittances = safeParse(req.body.quittances);
    }
    if (req.body.reglements !== undefined) {
      updateData.reglements = safeParse(req.body.reglements);
    }

    const allowedFields = [...Object.keys(req.body)].filter(key => !['certificats', 'quittances', 'reglements'].includes(key));
    allowedFields.forEach((key) => {
      updateData[key] = req.body[key];
    });

    console.log('DEBUG updateData:', updateData);

    const declaration = await DeclarationAT.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true, context: 'query' }
    );

    if (!declaration) {
      return res.status(404).json({ message: "Déclaration non trouvée" });
    }

    res.json(declaration);
  } catch (err) {
    console.error("Erreur mise à jour déclaration :", err);
    console.error(err.stack);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};