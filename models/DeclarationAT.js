import mongoose from "mongoose";

const declarationATSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  dateNaissance: { type: Date, required: true },
  cin: { type: String, required: true },

  port1: String,
  port2: String,
  adresse: String,
  departement: String,
  fonction: String,
  activite: String,

  salaireJournalier: Number,

  typeAccident: {
    type: String,
    enum: ["travail", "circulation", "trajet"],
    required: true
  },

  referenceCie: String,
  referenceSte: String,

  // Transport
  transport: {
    type: String,
    enum: ["aucun", "plateforme-assistance", "voiture", "ambulance"],
    required: true
  },
  nomAmbulance: String,
  heureAppelAmbulance: String,
  heureArriveeAmbulance: String,
  etablissementMedical: String,

  // Certificats médicaux
  certificats: [new mongoose.Schema({
    id: String,
    type: String,
    dateStamp: String,
    dateEnvoi: String,
    duree: Number
  }, { _id: false })],

  // Quittances
  quittances: [new mongoose.Schema({
    id: String,
    dateReception: String,
    dateSignature: String,
    dateRenvoi: String
  }, { _id: false })],

  // Règlements
  reglements: [new mongoose.Schema({
    id: String,
    dateReception: String,
    dateRemise: String
  }, { _id: false })],

  // 🔥 FIX IMPORTANT
  societe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Societe",
    required: true
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("DeclarationAT", declarationATSchema);