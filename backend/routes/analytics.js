// backend/routes/analytics.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const SeizureLog = require('../models/SeizureLog');
const MedicationDetails = require('../models/MedicationDetails');

// Get total counts for users, seizure logs, and medications
router.get('/counts', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const seizureLogCount = await SeizureLog.countDocuments();
    const medicationCount = await MedicationDetails.countDocuments();

    res.json({ userCount, seizureLogCount, medicationCount });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get statistics for users by role
router.get('/user-roles', async (req, res) => {
  try {
    const roles = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);

    res.json(roles);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get statistics for seizure types
router.get('/seizure-types', async (req, res) => {
  try {
    const seizureTypes = await SeizureLog.aggregate([
      { $unwind: "$seizureLogs" },
      { $group: { _id: "$seizureLogs.type", count: { $sum: 1 } } }
    ]);

    res.json(seizureTypes);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get statistics for medication usage
router.get('/medication-usage', async (req, res) => {
  try {
    const medicationUsage = await User.aggregate([
      { $match: { role: 'Patient' } },
      { $group: { _id: "$epilepsyDetails.medication", count: { $sum: 1 } } },
      { $sort: { _id: 1 } } // Sort by medication name
    ]);

    res.json(medicationUsage);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
