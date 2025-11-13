import { getWeather } from '../services/weatherService.js';

export const getWeatherData = async (req, res) => {
  try {
    const { city } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const weather = await getWeather(apiKey, city);
    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};