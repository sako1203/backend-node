import mongoose from "mongoose";

const certificatMedicalSchema = new mongoose.Schema({
  declaration_at: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeclarationAT",
    required: true
  },
  type: {
    type: String,
    enum: [
      "certificat initial",
      "certificat de reprise de travail",
      "certificat de prolongation",
      "certificat de guérison"
    ],
    required: true
  },
  du: Date,
  au: Date,
  nombreJours: Number,
  nbJoursMedicins: Number,
  ecart: String,
  validation: String,
  dateValidation: Date,
  dateAapposer: Date,
  envoisieg: Date,
  receptionagence: Date,
  dateenvoicourrier: Date,
  envoiassurance: Date,
  inspectiontravail: String,
  duree: Number,
  dateStamp: String,
  dateEnvoi: String,
  fromDate: String,
  toDate: String,
  dateReception: String,
  dateVictime: String,
  backoffice: String,
  tauxIPP: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("CertificatMedical", certificatMedicalSchema);
