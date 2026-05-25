import User from "../models/User.js";
import bcrypt from "bcrypt";

// 🔹 Récupérer tous les utilisateurs
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // 🔐 cacher password
    res.json(users);
  } catch (err) {
    console.error("Erreur getUsers:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 🔹 Créer un utilisateur
export const createUser = async (req, res) => {
  try {
    const { nom, prenom, username, password, role } = req.body;

    // ✅ Validation
    if (!nom || !prenom || !username || !password || !role) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // ✅ Vérifier username unique
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "Utilisateur existe déjà" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Création utilisateur
    const user = await User.create({
      nom,
      prenom,
      username,
      password: hashedPassword,
      role
    });

    // ✅ Réponse propre (sans password)
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        _id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Erreur createUser:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 🔹 Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Vérifier ID valide MongoDB
    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });

  } catch (err) {
    console.error("Erreur deleteUser:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};