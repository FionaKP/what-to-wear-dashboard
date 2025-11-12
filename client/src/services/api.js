import axios from 'axios';

const API_BASE_URL = 'http://localhost:80/api';

export const weatherAPI = {
  getWeather: (city = 'Worcester') => 
    axios.get(`${API_BASE_URL}/weather`, { params: { city } })
};

export const outfitAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/outfits`),
  create: (outfit) => axios.post(`${API_BASE_URL}/outfits`, outfit),
  update: (id, outfit) => axios.put(`${API_BASE_URL}/outfits/${id}`, outfit),
  delete: (id) => axios.delete(`${API_BASE_URL}/outfits/${id}`)
};