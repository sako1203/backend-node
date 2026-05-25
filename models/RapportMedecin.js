import mongoose from "mongoose";

const rapportMedecinSchema = new mongoose.Schema({
  declaration_at: { type: mongoose.Schema.Types.ObjectId, ref: "DeclarationAT", required: false },
  responsable_at: { type: mongoose.Schema.Types.ObjectId, ref: "RapportResponsable", required: false },
  enqueteur_at: { type: mongoose.Schema.Types.ObjectId, ref: "RapportEnqueteur", required: false },
  societe: { type: mongoose.Schema.Types.ObjectId, ref: "Societe", required: true },
  dateAT: { type: Date, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  dateNaissance: { type: Date, required: true },
  cin: { type: String, required: true },

  partieCorps: { type: String, required: true },
  typeLesion: { type: String, required: true },
  degreBlessure: { type: String, required: true },

  nomMedecin: { type: String, required: true },
  rapport: { type: String, required: true },
  joursArret: { type: Number, required: true },
  certificat: { type: String }
}, { timestamps: true });

export default mongoose.model("RapportMedecin", rapportMedecinSchema);