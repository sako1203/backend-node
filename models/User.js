import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    nom: { type: String, required: true, trim: true },
    prenom: { type: String, required: true, trim: true },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "medecin", "responsable", "service-at", "enqueteur", "backoffice"],
      default: "enqueteur",
    },
  },
  { timestamps: true }
);

// 🔥 FORCE NORMALISATION DU ROLE
userSchema.pre("save", function (next) {
  if (this.role) {
    this.role = this.role.toLowerCase().trim();
  }
  next();
});

export default model("User", userSchema);