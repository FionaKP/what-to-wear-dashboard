import React, { useState, useEffect } from 'react';
import { weatherAPI } from '../services/api';

const WeatherCard = ({ onWeatherLoad }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Worcester');

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const response = await weatherAPI.getWeather(city);
      setWeather(response.data);
      if (onWeatherLoad) {
        onWeatherLoad(response.data);
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading weather...</div>;
  if (!weather) return <div>Unable to load weather</div>;

  return (
    <div className="weather-card">
      <h2>Current Weather in {city}</h2>
      <div className="weather-info">
        <img 
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
        />
        <div>
          <h3>{weather.temperature}°F</h3>
          <p>Feels like: {weather.feelsLike}°F</p>
          <p>{weather.description}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {weather.windSpeed} mph</p>
        </div>
      </div>
      <input 
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
    </div>
  );
};

export default WeatherCard;