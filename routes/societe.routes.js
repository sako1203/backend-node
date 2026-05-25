import express from "express";
import {
  createSociete,
  getAllSocietes,
  deleteSociete
} from "../controllers/societe.controller.js";

const router = express.Router();

router.get("/", getAllSocietes);
router.post("/", createSociete);
router.delete("/:id", deleteSociete);

export default router;