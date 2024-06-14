import express from "express";
import noteController from "../controllers/noteController.js";
const router = express.Router();

// Define routes and map them to controller functions
router.get("/", noteController.getNotes);
router.post("/", noteController.createNote);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);
router.patch("/:id/archive", noteController.archiveNote);
export default router;

