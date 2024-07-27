// backend/routes/patients.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all patients with epilepsy
router.get('/patients', async (req, res) => {
  try {
    const patients = await User.find({ role: 'Patient' }, 'name epilepsyDetails');
    res.json(patients);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
