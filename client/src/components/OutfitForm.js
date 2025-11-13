import React, { useState, useEffect } from 'react';
import { weatherAPI, outfitAPI } from '../services/api';

const OutfitForm = ({ onSubmit, initialData }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    temperature: '',
    feels_like: '',
    weather_condition: '',
    weather_description: '',
    top: '',
    bottom: '',
    shoes: '',
    outerwear: '',
    accessories: '',
    activity: '',
    comfort_rating: '',
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      fetchWeather();
    }
  }, [initialData]);

  const fetchWeather = async () => {
    try {
      const response = await weatherAPI.getWeather('Worcester');
      const weatherData = response.data;
      setWeather(weatherData);
      setFormData(prev => ({
        ...prev,
        temperature: weatherData.temperature,
        feels_like: weatherData.feelsLike,
        weather_condition: weatherData.conditions,
        weather_description: weatherData.description
      }));
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData && initialData.id) {
        await outfitAPI.update(initialData.id, formData);
      } else {
        await outfitAPI.create(formData);
      }
      if (onSubmit) onSubmit();
      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        temperature: '',
        feels_like: '',
        weather_condition: '',
        weather_description: '',
        top: '',
        bottom: '',
        shoes: '',
        outerwear: '',
        accessories: '',
        activity: '',
        comfort_rating: '',
        notes: ''
      });
      fetchWeather();
    } catch (error) {
      console.error('Error saving outfit:', error);
      alert('Failed to save outfit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="outfit-form">
      <h2>{initialData ? 'Edit Outfit' : 'Log New Outfit'}</h2>
      
      {weather && !initialData && (
        <div className="weather-preview">
          <h3>Current Weather</h3>
          <p>{weather.temperature}°F - {weather.description}</p>
          <button type="button" onClick={fetchWeather}>Refresh Weather</button>
        </div>
      )}

      <div className="form-section">
        <h3>Date & Weather</h3>
        
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Temperature (°F):
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Feels Like (°F):
          <input
            type="number"
            name="feels_like"
            value={formData.feels_like}
            onChange={handleChange}
          />
        </label>

        <label>
          Weather Condition:
          <input
            type="text"
            name="weather_condition"
            value={formData.weather_condition}
            onChange={handleChange}
            placeholder="e.g., Clear, Clouds, Rain"
          />
        </label>
      </div>

      <div className="form-section">
        <h3>What You Wore</h3>
        
        <label>
          Top:
          <input
            type="text"
            name="top"
            value={formData.top}
            onChange={handleChange}
            placeholder="e.g., Blue sweater, T-shirt"
          />
        </label>

        <label>
          Bottom:
          <input
            type="text"
            name="bottom"
            value={formData.bottom}
            onChange={handleChange}
            placeholder="e.g., Jeans, Leggings"
          />
        </label>

        <label>
          Shoes:
          <input
            type="text"
            name="shoes"
            value={formData.shoes}
            onChange={handleChange}
            placeholder="e.g., Sneakers, Boots"
          />
        </label>

        <label>
          Outerwear:
          <input
            type="text"
            name="outerwear"
            value={formData.outerwear}
            onChange={handleChange}
            placeholder="e.g., Rain jacket, Puffer coat"
          />
        </label>

        <label>
          Accessories:
          <input
            type="text"
            name="accessories"
            value={formData.accessories}
            onChange={handleChange}
            placeholder="e.g., Scarf, Hat, Gloves"
          />
        </label>
      </div>

      <div className="form-section">
        <h3>Activity & Rating</h3>
        
        <label>
          Activity:
          <input
            type="text"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            placeholder="e.g., Walking to class, Soccer practice"
          />
        </label>

        <label>
          Comfort Rating:
          <select
            name="comfort_rating"
            value={formData.comfort_rating}
            onChange={handleChange}
            required
          >
            <option value="">Select rating...</option>
            <option value="Too Cold">Too Cold ❄️</option>
            <option value="A bit chilly">A bit chilly 🥶</option>
            <option value="Perfect">Perfect ✅</option>
            <option value="A bit warm">A bit warm 🌡️</option>
            <option value="Too Hot">Too Hot 🥵</option>
            <option value="Not good for activity">Not good for activity 🏃</option>
          </select>
        </label>

        <label>
          Notes:
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional thoughts..."
            rows="3"
          />
        </label>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : (initialData ? 'Update Outfit' : 'Save Outfit')}
      </button>
    </form>
  );
};

export default OutfitForm;