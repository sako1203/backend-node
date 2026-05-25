import mongoose from "mongoose";

const rapportEnqueteurSchema = new mongoose.Schema({
  declaration_at: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeclarationAT",
    required: true
  },
  societe: {                  // <-- nouveau champ société
    type: mongoose.Schema.Types.ObjectId,
    ref: "Societe",           // Assure-toi d'avoir un modèle Societe
    required: true
  },
  nomEnqueteur: {
    type: String,
    required: true
  },
  numeroSinistre: {
    type: String,
    required: true
  },
  dateEnquete: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  conclusion: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("RapportEnqueteur", rapportEnqueteurSchema);