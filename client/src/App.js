import React, { useState } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';

function App() {
  const [weather, setWeather] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>What to Wear Dashboard</h1>
      </header>
      <main>
        <WeatherCard onWeatherLoad={setWeather} />
        {/* Add your outfit components here */}
      </main>
    </div>
  );
}

export default App;