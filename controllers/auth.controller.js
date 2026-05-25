import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "SECRET_KEY";

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    let { username, password, role } = req.body;

    username = username?.trim();
    password = password?.trim();
    role = role?.toLowerCase().trim();

    if (!username || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "Utilisateur existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      role: role || "enqueteur",
    });

    await user.save();

    res.status(201).json({
      message: "Utilisateur créé",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur création utilisateur" });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    let { username, password } = req.body;

    username = username?.trim();
    password = password?.trim();

    if (!username || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Utilisateur introuvable" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const normalizedRole = user.role?.toLowerCase().trim();

    const token = jwt.sign(
      {
        id: user._id,
        role: normalizedRole,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: normalizedRole,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};