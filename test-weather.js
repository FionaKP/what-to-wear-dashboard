import dotenv from 'dotenv';
dotenv.config();

import { getWeather } from './services/weatherService.js';

async function test() {
  console.log('Testing weather API...');
  console.log('API Key exists:', !!process.env.OPENWEATHER_API_KEY);
  
  try {
    const weather = await getWeather('Worcester');
    console.log('Success! Weather data:', weather);
  } catch (error) {
    console.error('Failed:', error.message);
  }
}

test();