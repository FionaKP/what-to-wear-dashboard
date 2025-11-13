import React, { useState, useEffect } from 'react';
import { outfitAPI } from '../services/api';

const OutfitList = ({ refreshTrigger }) => {
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ type: 'all' });

  useEffect(() => {
    fetchOutfits();
  }, [refreshTrigger, filter]);

  const fetchOutfits = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (filter.type === 'temperature' && filter.minTemp && filter.maxTemp) {
        params.minTemp = filter.minTemp;
        params.maxTemp = filter.maxTemp;
      } else if (filter.type === 'activity' && filter.activity) {
        params.activity = filter.activity;
      }
      
      const response = await outfitAPI.getAll(params);
      setOutfits(response.data);
    } catch (error) {
      console.error('Error fetching outfits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this outfit entry?')) {
      try {
        await outfitAPI.delete(id);
        fetchOutfits();
      } catch (error) {
        console.error('Error deleting outfit:', error);
        alert('Failed to delete outfit');
      }
    }
  };

  if (loading) return <div>Loading outfits...</div>;

  return (
    <div className="outfit-list">
      <h2>Your Outfit History</h2>
      
      {outfits.length === 0 ? (
        <p>No outfits logged yet. Start by adding your first outfit above!</p>
      ) : (
        <div className="outfits-grid">
          {outfits.map(outfit => (
            <div key={outfit.id} className="outfit-card">
              <div className="outfit-header">
                <span className="outfit-date">{outfit.date}</span>
                <span className="outfit-temp">{outfit.temperature}°F</span>
              </div>
              
              <div className="outfit-weather">
                <p>{outfit.weather_condition} - {outfit.weather_description}</p>
                {outfit.feels_like && <p>Feels like: {outfit.feels_like}°F</p>}
              </div>

              <div className="outfit-details">
                {outfit.top && <p><strong>Top:</strong> {outfit.top}</p>}
                {outfit.bottom && <p><strong>Bottom:</strong> {outfit.bottom}</p>}
                {outfit.shoes && <p><strong>Shoes:</strong> {outfit.shoes}</p>}
                {outfit.outerwear && <p><strong>Outerwear:</strong> {outfit.outerwear}</p>}
                {outfit.accessories && <p><strong>Accessories:</strong> {outfit.accessories}</p>}
              </div>

              {outfit.activity && (
                <p className="outfit-activity">
                  <strong>Activity:</strong> {outfit.activity}
                </p>
              )}

              <div className="outfit-rating">
                <strong>Rating:</strong> {outfit.comfort_rating}
              </div>

              {outfit.notes && (
                <p className="outfit-notes">{outfit.notes}</p>
              )}

              <button 
                onClick={() => handleDelete(outfit.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OutfitList;