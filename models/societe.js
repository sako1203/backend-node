import mongoose from "mongoose";

const societeSchema = new mongoose.Schema(
  {
    nomSociete: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    adresse: {
      type: String,
      default: ""
    },

    contact: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Societe", societeSchema);