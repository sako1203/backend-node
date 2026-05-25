import mongoose from "mongoose";

const donneesBackOfficeSchema = new mongoose.Schema({
  declaration_at: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeclarationAT",
    required: true
  },
  section: {
    type: String,
    enum: [
      "infosVictime",
      "etatBlessures",
      "certificats",
      "quittances",
      "reglements",
      "protection"
    ],
    required: true
  },
  donnees: mongoose.Schema.Types.Mixed,
  montantTotalVerse: Number,
  tauxIPP: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("DonneesBackOffice", donneesBackOfficeSchema);
