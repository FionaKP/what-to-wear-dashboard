import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import outfitRoutes from "./routes/outfits.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/outfits", outfitRoutes);

app.get("/", (req, res) => {
  res.send("👗 What To Wear Dashboard API is running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
