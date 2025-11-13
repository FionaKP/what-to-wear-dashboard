# What to Wear Dashboard

A full-stack web application that helps you track what you wear in different weather conditions and activities. Log your outfits with real-time weather data and get insights on what works best for different temperatures.

Personal project by Fiona Prendergast, developer and engineer studying at Worcester Polytechnic Institute. Using this project to explore full stack integrations and practice building out project functionality across phases. Utilizing AI to practice computer aided design and hyperspeed style software engineering - working with many different parts of the stack at once because of the speed advantages of artificial intelligence. Gives you a speed boost but you also have to keep track of the pieces streaking past so that when you do stop and slow down at your destination you're where you meant to go and not way off track. 

## Features

- Real time weather data integration through OpenWeatherMap API
- Log outfits with details for different items (top, bottoms, etc.)
- Track comfort ratings (too cold, too warm, etc.)
- Mobile friendly interface
- SQLite database for persistent storage

## Project Structure
```
what-to-wear-dashboard/
│
├── server.js                # Express server entry point
├── .env                     # Environment variables (API keys, PORT)
├── package.json
│
├── db/
│   ├── database.js          # SQLite setup and queries
│   └── outfits.db           # SQLite database (created automatically)
│
├── routes/
│   ├── outfits.js           # Outfit CRUD endpoints
│   └── weather.js           # Weather API endpoints
│
├── controllers/
│   ├── outfitController.js  # Outfit business logic
│   └── weatherController.js # Weather business logic
│
├── services/
│   └── weatherService.js    # OpenWeatherMap API integration
│
└── client/                  # React frontend
    ├── public/
    ├── src/
    │   ├── App.js
    │   ├── components/
    │   │   ├── WeatherCard.js
    │   │   ├── OutfitForm.js
    │   │   └── OutfitList.js
    │   └── services/
    │       └── api.js       # API service for backend calls
    └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- npm
- OpenWeatherMap API key ([Get one here](https://openweathermap.org/api))
- ngrok (optional, for mobile access)

## Setup

1. **Clone the repository**
```bash
   git clone https://github.com/fionakp/what-to-wear-dashboard.git
   cd what-to-wear-dashboard
```

2. **Install backend dependencies**
```bash
   npm install
```

3. **Install frontend dependencies**
```bash
   cd client
   npm install
   cd ..
```

4. **Create .env file**
   
   Create a `.env` file in the root directory:
```
   PORT=80
   OPENWEATHER_API_KEY=your_api_key_here
```

5. **Get your OpenWeatherMap API key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Navigate to [API Keys](https://home.openweathermap.org/api_keys)
   - Copy your API key and add it to `.env`
   - Note: New API keys can take up to 2 hours to activate

## Running the Application

### Option 1: Run backend and frontend separately (Recommended for development)

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Run both concurrently
```bash
npm run dev:full
```

### For Mobile Access (using ngrok)

**Terminal 3 - ngrok:**
```bash
ngrok http 80
```

## API Endpoints

### Weather
- `GET /api/weather?city=Worcester` - Get current weather for a city

### Outfits
- `GET /api/outfits` - Get all outfits
- `GET /api/outfits/:id` - Get outfit by ID
- `POST /api/outfits` - Create new outfit
- `PUT /api/outfits/:id` - Update outfit
- `DELETE /api/outfits/:id` - Delete outfit

Query parameters:
- `?minTemp=30&maxTemp=50` - Filter by temperature range
- `?activity=walking` - Filter by activity

## Technologies Used

**Backend:**
- Node.js
- Express.js
- SQLite (with sqlite3 and sqlite packages)
- OpenWeatherMap API
- dotenv
- axios

**Frontend:**
- React
- axios
- CSS3

## Future Updates and Features to Add
- [ ] Outfit recommendations based on weather
- [ ] Photo upload for outfits
- [ ] Advanced filtering and search
- [ ] Data visualization (charts/graphs)
- [ ] Export data functionality
- [ ] User authentication
- [ ] Weather forecasts for planning ahead
