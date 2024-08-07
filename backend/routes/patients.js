const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all patients with epilepsy
router.get('/patients', authenticateToken, authorizeRole(['Doctor', 'Admin']), async (req, res) => {
  try {
    const patients = await User.find({ role: 'Patient' }, 'name email age gender primaryCarePhysician epilepsyDetails');
    res.json(patients);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get a specific patient's details
router.get('/patients/:id', authenticateToken, authorizeRole(['Doctor', 'Admin']), async (req, res) => {
  try {
    console.log('Fetching patient with ID:', req.params.id);

    // Use the new keyword to create an ObjectId
    const patientId = new mongoose.Types.ObjectId(req.params.id);
    console.log('Converted ObjectId:', patientId);

    const patient = await User.findById(patientId, 'name email age gender dateOfBirth phoneNumber address primaryCarePhysician emergencyContact knownAllergies previousSurgeries comorbidities epilepsyDetails lifestyle supportResources');
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

// Get all medications and their counts
router.get('/medications', authenticateToken, authorizeRole(['Doctor', 'Admin']), async (req, res) => {
  try {
    const medications = await User.aggregate([
      { $match: { role: 'Patient' } },
      { $group: { _id: "$epilepsyDetails.medication", count: { $sum: 1 } } },
      { $sort: { _id: 1 } } // Sort by medication name
    ]);
    res.json(medications);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

const MedicationDetails = require('../models/MedicationDetails'); // THIS FETCHES MEDICATIONS FROM THE COLLECTION CALLED "MedicationDetails.js"

router.get('/medications/:name', authenticateToken, authorizeRole(['Doctor', 'Admin']), async (req, res) => {
  try {
    const medicationDetails = await MedicationDetails.findOne({ name: req.params.name });
    if (!medicationDetails) {
      return res.status(404).send('Medication not found');
    }
    res.json(medicationDetails);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get a specific patient's details by email
router.get('/patients/email/:email', authenticateToken, authorizeRole(['Patient', 'Doctor', 'Admin']), async (req, res) => {
  try {
    const patient = await User.findOne({ email: req.params.email });
    if (!patient) {
      return res.status(404).send('Patient not found');
    }
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).send('Server error');
  }
});

// Update a patient's details
router.put('/patients/:id', authenticateToken, authorizeRole(['Patient', 'Doctor', 'Admin']), async (req, res) => {
  try {
    const patientId = new mongoose.Types.ObjectId(req.params.id);
    const updatedPatient = await User.findByIdAndUpdate(patientId, req.body, { new: true });
    if (!updatedPatient) {
      return res.status(404).send('Patient not found');
    }
    res.json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).send('Invalid patient ID format');
    }
    res.status(500).send('Server error');
  }
});


module.exports = router;