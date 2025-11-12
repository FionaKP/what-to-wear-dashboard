import { initDB } from "../db/database.js";

export const addOutfit = async (req, res) => {
  try {
    const { temperature, conditions, outfit, rating } = req.body;

    if (!outfit || !rating) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const db = await initDB();
    await db.run(
      "INSERT INTO outfits (temperature, conditions, outfit, rating) VALUES (?, ?, ?, ?)",
      [temperature, conditions, outfit, rating]
    );

    res.status(201).json({ message: "Outfit saved successfully." });
  } catch (error) {
    console.error("Error saving outfit:", error);
    res.status(500).json({ error: "Failed to save outfit." });
  }
};

export const getOutfits = async (req, res) => {
  try {
    const db = await initDB();
    const outfits = await db.all("SELECT * FROM outfits ORDER BY created_at DESC");
    res.json(outfits);
  } catch (error) {
    console.error("Error fetching outfits:", error);
    res.status(500).json({ error: "Failed to fetch outfits." });
  }
};
