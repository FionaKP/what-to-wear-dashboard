import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

export const initializeDatabase = async () => {
  db = await open({
    filename: path.join(__dirname, 'outfits.db'),
    driver: sqlite3.Database
  });

  // Create outfits table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS outfits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      temperature REAL NOT NULL,
      feels_like REAL,
      weather_condition TEXT,
      weather_description TEXT,
      top TEXT,
      bottom TEXT,
      shoes TEXT,
      outerwear TEXT,
      accessories TEXT,
      activity TEXT,
      comfort_rating TEXT NOT NULL,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Database initialized');
  return db;
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase first.');
  }
  return db;
};

// Outfit queries
export const getAllOutfits = async () => {
  const db = getDatabase();
  return await db.all('SELECT * FROM outfits ORDER BY date DESC');
};

export const getOutfitById = async (id) => {
  const db = getDatabase();
  return await db.get('SELECT * FROM outfits WHERE id = ?', id);
};

export const createOutfit = async (outfit) => {
  const db = getDatabase();
  const result = await db.run(
    `INSERT INTO outfits (
      date, temperature, feels_like, weather_condition, weather_description,
      top, bottom, shoes, outerwear, accessories, activity, comfort_rating, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      outfit.date,
      outfit.temperature,
      outfit.feels_like,
      outfit.weather_condition,
      outfit.weather_description,
      outfit.top,
      outfit.bottom,
      outfit.shoes,
      outfit.outerwear,
      outfit.accessories,
      outfit.activity,
      outfit.comfort_rating,
      outfit.notes
    ]
  );
  return result.lastID;
};

export const updateOutfit = async (id, outfit) => {
  const db = getDatabase();
  return await db.run(
    `UPDATE outfits SET
      date = ?, temperature = ?, feels_like = ?, weather_condition = ?,
      weather_description = ?, top = ?, bottom = ?, shoes = ?, outerwear = ?,
      accessories = ?, activity = ?, comfort_rating = ?, notes = ?
    WHERE id = ?`,
    [
      outfit.date,
      outfit.temperature,
      outfit.feels_like,
      outfit.weather_condition,
      outfit.weather_description,
      outfit.top,
      outfit.bottom,
      outfit.shoes,
      outfit.outerwear,
      outfit.accessories,
      outfit.activity,
      outfit.comfort_rating,
      outfit.notes,
      id
    ]
  );
};

export const deleteOutfit = async (id) => {
  const db = getDatabase();
  return await db.run('DELETE FROM outfits WHERE id = ?', id);
};

export const getOutfitsByTemperatureRange = async (minTemp, maxTemp) => {
  const db = getDatabase();
  return await db.all(
    'SELECT * FROM outfits WHERE temperature BETWEEN ? AND ? ORDER BY date DESC',
    [minTemp, maxTemp]
  );
};

export const getOutfitsByActivity = async (activity) => {
  const db = getDatabase();
  return await db.all(
    'SELECT * FROM outfits WHERE activity LIKE ? ORDER BY date DESC',
    [`%${activity}%`]
  );
};