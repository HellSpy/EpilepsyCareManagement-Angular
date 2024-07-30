const express = require('express');
const MedicationDetails = require('../models/MedicationDetails');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all medications with their counts
router.get('/medications', authenticateToken, authorizeRole(['Doctor', 'Admin']), async (req, res) => {
  try {
    const medications = await MedicationDetails.find({}, { name: 1 });
    res.json(medications);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get details of a specific medication by ID
router.get('/medications/:id', authenticateToken, authorizeRole(['Doctor', 'Admin']), async (req, res) => {
  try {
    const medication = await MedicationDetails.findById(req.params.id);
    if (!medication) {
      return res.status(404).send('Medication not found');
    }
    res.json(medication);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
