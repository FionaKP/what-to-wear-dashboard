# what-to-wear-dashboard

what-to-wear-dashboard/
│
├── server.js                # Entry point
├── .env                     # Environment variables (like PORT, API keys)
├── package.json
│
├── db/
│   └── database.js          # Handles SQLite setup and queries
│
├── routes/
│   └── outfits.js           # Express routes for your outfit endpoints
│
└── controllers/
    └── outfitController.js  # Business logic for each route

To run: 
npm run start
ngrok http 80
cd client
npm start

then follow the links to the hosted proxy sites

weather API: https://home.openweathermap.org/users/confirmation?confirmation_token=MjL_izRB3vWiNiuC1RSJ
