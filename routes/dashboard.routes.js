import express from "express";
import { rechercherSinistre } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/recherche", rechercherSinistre);

export default router;