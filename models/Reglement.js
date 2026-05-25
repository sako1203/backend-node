import mongoose from "mongoose";

const reglementSchema = new mongoose.Schema({
  declaration_at: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeclarationAT",
    required: true
  },
  dateReception: Date,
  dateReceptionMontant: Date,
  typePaiement: String,
  montant: Number,
  dateRemise: Date,
  dateRglVictime: Date,
  modeRglt: String,
  banque: String,
  dateDebutBancaire: Date,
  ecartDate: Number,
  nbJours: Number,
  backoffice: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Reglement", reglementSchema);
