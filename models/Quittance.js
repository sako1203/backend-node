import mongoose from "mongoose";

const quittanceSchema = new mongoose.Schema({
  declaration_at: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeclarationAT",
    required: true
  },
  numero: String,
  dateReception: Date,
  dateSignatureVictime: Date,
  du: Date,
  au: Date,
  montantVerse: Number,
  statut: String,
  signature: String,
  dateEnvoi: Date,
  backoffice: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Quittance", quittanceSchema);
