import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const sinistreSchema = new Schema(
  {
    dossierNumber: { type: String, required: true },
    typeForm: { type: String, required: true }, // exemple: "individuel", "service-at", etc.
    data: { type: Schema.Types.Mixed, required: true } // peut contenir n'importe quel objet
  },
  { timestamps: true } // createdAt et updatedAt automatiquement
);

export default model("Sinistre", sinistreSchema);