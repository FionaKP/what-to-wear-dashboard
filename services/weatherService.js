import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeather = async (apiKey, city = 'Worcester', units = 'imperial') => {
  console.log('Fetching weather for:', city);
  
  if (!apiKey) {
    throw new Error('API key is required');
  }
  
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: apiKey,
        units: units
      }
    });

    console.log('Weather API response successful');

    return {
      temperature: Math.round(response.data.main.temp),
      feelsLike: Math.round(response.data.main.feels_like),
      conditions: response.data.weather[0].main,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      icon: response.data.weather[0].icon
    };
  } catch (error) {
    console.error('Error fetching weather:', error.response?.data || error.message);
    throw new Error('Failed to fetch weather data');
  }
};