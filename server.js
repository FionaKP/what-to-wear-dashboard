import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import outfitRoutes from "./routes/outfits.js";
import weatherRoutes from './routes/weather.js';
import { initializeDatabase } from './db/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/outfits", outfitRoutes);
app.use('/api/weather', weatherRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("👗 What To Wear Dashboard API is running!");
});

// Initialize database
const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();