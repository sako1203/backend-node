import express from "express";
import { createDeclaration, getAllDeclarations, getDeclarationById, updateDeclaration } from "../controllers/declarationAT.controller.js";

const router = express.Router();

// POST pour créer
router.post("/create", createDeclaration);

// GET pour lister
router.get("/", getAllDeclarations);

// GET pour récupérer une déclaration spécifique
router.get("/:id", getDeclarationById);

// PUT pour mettre à jour une déclaration
router.put("/:id", updateDeclaration);

export default router;