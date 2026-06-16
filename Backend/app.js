const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const handleIncomingData = require('./utils/notification');

app.set("view engine", "html");
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin'],
  credentials: true
}));

app.get('/venue', (req, res) => {
  res.sendFile(path.join(__dirname, "venue-inquiry.html"))
});

// POST request on /inquiry
app.post('/inquiry', (req, res) => {
  console.log('Received inquiry:');
  handleIncomingData({ message: req.body });
  res.status(200).json({ message: 'Inquiry received successfully', data: req.body });
});

// POST request on /venueData
app.post('/venue', (req, res) => {
  console.log('Received venue data:');
  handleIncomingData({ message: req.body });
  // Get the target URL
  const redirectUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  // Return it as JSON instead of res.redirect()
  res.status(200).json({
    message: 'Venue data received successfully',
    redirectUrl: redirectUrl
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
