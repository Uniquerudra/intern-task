const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5001;

app.use(cors());
const staticPath = path.join(__dirname, '../frontend');
app.use(express.static(staticPath));

app.get('/api/dashboard', (req, res) => {
  const data = {
    name: 'Srinivas',
    referral_code: 'SheCanFoundation2025',
    donations_raised: 1500
  };
  res.json(data);
});

app.get('/api/leaderboard', (req, res) => {
  const leaderboard = [
    { name: 'Rudra', donations_raised: 2500 },
    { name: 'Utkarsh', donations_raised: 2200 },
    { name: 'Suneel', donations_raised: 1500 },
    { name: 'Nikhil Dixit', donations_raised: 1200 },
    { name: 'Shiwang Solanki', donations_raised: 950 }
  ];
  res.json(leaderboard);
});
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
