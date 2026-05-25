import express from "express";
import { getUsers, createUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/create", createUser);
router.delete("/:id", deleteUser); // ⚠️ important

export default router;