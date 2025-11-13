import express from 'express';
import {
  getOutfits,
  getOutfit,
  addOutfit,
  editOutfit,
  removeOutfit
} from '../controllers/outfitController.js';

const router = express.Router();

router.get('/', getOutfits);
router.get('/:id', getOutfit);
router.post('/', addOutfit);
router.put('/:id', editOutfit);
router.delete('/:id', removeOutfit);

export default router;