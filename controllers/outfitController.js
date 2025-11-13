import {
  getAllOutfits,
  getOutfitById,
  createOutfit,
  updateOutfit,
  deleteOutfit,
  getOutfitsByTemperatureRange,
  getOutfitsByActivity
} from '../db/database.js';

export const getOutfits = async (req, res) => {
  try {
    const { minTemp, maxTemp, activity } = req.query;
    
    let outfits;
    if (minTemp && maxTemp) {
      outfits = await getOutfitsByTemperatureRange(parseFloat(minTemp), parseFloat(maxTemp));
    } else if (activity) {
      outfits = await getOutfitsByActivity(activity);
    } else {
      outfits = await getAllOutfits();
    }
    
    res.json(outfits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOutfit = async (req, res) => {
  try {
    const outfit = await getOutfitById(req.params.id);
    if (!outfit) {
      return res.status(404).json({ error: 'Outfit not found' });
    }
    res.json(outfit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addOutfit = async (req, res) => {
  try {
    const id = await createOutfit(req.body);
    const outfit = await getOutfitById(id);
    res.status(201).json(outfit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editOutfit = async (req, res) => {
  try {
    await updateOutfit(req.params.id, req.body);
    const outfit = await getOutfitById(req.params.id);
    res.json(outfit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeOutfit = async (req, res) => {
  try {
    await deleteOutfit(req.params.id);
    res.json({ message: 'Outfit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};