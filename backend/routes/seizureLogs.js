const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const SeizureLog = require('../models/SeizureLog'); // Import the SeizureLog model

// Middleware to check if route is initialized
router.use((req, res, next) => {
  console.log('Seizure Logs route initialized');
  next();
});

// Get all seizure logs
router.get('/seizure-logs', async (req, res) => {
  console.log('Fetching all seizure logs');
  try {
    const seizureLogs = await SeizureLog.find({});
    console.log('Seizure logs retrieved:', seizureLogs);
    res.json(seizureLogs);
  } catch (error) {
    console.error('Error fetching seizure logs:', error);
    res.status(500).send('Server error');
  }
});

// Export the router
module.exports = router;
