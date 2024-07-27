const express = require('express');
const mongoose = require('mongoose');
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

// Get a specific patient's details
router.get('/patients/:id', async (req, res) => {
  try {
    console.log('Fetching patient with ID:', req.params.id);

    // Use the `new` keyword to create an ObjectId
    const patientId = new mongoose.Types.ObjectId(req.params.id);
    console.log('Converted ObjectId:', patientId);

    const patient = await User.findById(patientId, 'name email epilepsyDetails');
    console.log('Patient found:', patient);

    if (!patient) {
      return res.status(404).send('Patient not found');
    }

    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).send('Invalid patient ID format');
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
