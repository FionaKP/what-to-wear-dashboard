import React, { useState } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import OutfitForm from './components/OutfitForm';
import OutfitList from './components/OutfitList';

function App() {
  const [refreshList, setRefreshList] = useState(0);

  const handleOutfitSubmit = () => {
    setRefreshList(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>What to Wear Dashboard</h1>
      </header>
      <main className="App-main">
        <WeatherCard />
        <OutfitForm onSubmit={handleOutfitSubmit} />
        <OutfitList refreshTrigger={refreshList} />
      </main>
    </div>
  );
}

export default App;