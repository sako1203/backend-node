import mongoose from "mongoose";

const rapportResponsableSchema = new mongoose.Schema({
  declaration_at: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "DeclarationAT", 
    required: true 
  }, // référence au sinistre

  societe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Societe", // collection des sociétés
    required: true
  },

  typeBlessure: { type: String, required: true },
  degreBlessure: { type: String, required: true },
  circonstances: { type: String, required: true },
  epiObligatoire: { type: String, required: true },
  epiPorte: { type: String, required: true },
  lienDirectEPI: { type: String },
  fauteCible: { type: String },
  avisVictime: { type: String },    // facultatif
  temoinNom: { type: String },      // facultatif
  temoinPrenom: { type: String },   // facultatif
  temoinCin: { type: String },      // facultatif
  decision: { type: String, required: true }

}, { timestamps: true });

export default mongoose.model("RapportResponsable", rapportResponsableSchema);