import express from "express";
import { addOutfit, getOutfits } from "../controllers/outfitController.js";

const router = express.Router();

router.post("/", addOutfit);
router.get("/", getOutfits);

export default router;
