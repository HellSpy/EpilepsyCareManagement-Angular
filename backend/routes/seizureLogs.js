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

// Get a specific patient's seizure logs
router.get('/seizure-logs/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    console.log(`Fetching seizure logs for patient ID: ${patientId}`);
    
    const patient = await SeizureLog.findById(patientId);
    console.log('Query result for patient:', patient);

    if (!patient) {
      console.log('Patient not found for ID:', patientId);
      return res.status(404).send('Patient not found');
    }
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient seizure logs:', error);
    res.status(500).send('Server error');
  }
});

// Add a new seizure log
router.post('/seizure-logs/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const { date, type, duration, triggers } = req.body;
    console.log(`Adding seizure log for patient ID: ${patientId}`);

    const patient = await SeizureLog.findById(patientId);

    if (!patient) {
      return res.status(404).send('Patient not found');
    }
    const newLog = {
      id: new mongoose.Types.ObjectId().toString(), // Generate a new ObjectId string
      date,
      type,
      duration,
      triggers
    };
    patient.seizureLogs.push(newLog);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    console.error('Error adding seizure log:', error);
    res.status(500).send('Server error');
  }
});

// Edit an existing seizure log
router.put('/seizure-logs/:patientId/:logId', async (req, res) => {
  try {
    const { patientId, logId } = req.params;
    const { date, type, duration, triggers } = req.body;
    console.log(`Editing seizure log ID: ${logId} for patient ID: ${patientId}`);

    const patient = await SeizureLog.findById(patientId);

    if (!patient) {
      console.log('Patient not found for ID:', patientId);
      return res.status(404).send('Patient not found');
    }
    const log = patient.seizureLogs.find(log => log.id === logId);
    if (!log) {
      console.log('Seizure log not found for ID:', logId);
      return res.status(404).send('Seizure log not found');
    }
    log.date = date;
    log.type = type;
    log.duration = duration;
    log.triggers = triggers;
    await patient.save();
    res.json(patient);
  } catch (error) {
    console.error('Error editing seizure log:', error);
    res.status(500).send('Server error');
  }
});

// Delete a seizure log
router.delete('/seizure-logs/:patientId/:logId', async (req, res) => {
  try {
    const { patientId, logId } = req.params;
    console.log(`Deleting seizure log ID: ${logId} for patient ID: ${patientId}`);

    const patient = await SeizureLog.findById(patientId);

    if (!patient) {
      console.log('Patient not found for ID:', patientId);
      return res.status(404).send('Patient not found');
    }
    const log = patient.seizureLogs.find(log => log.id === logId);
    if (!log) {
      console.log('Seizure log not found for ID:', logId);
      return res.status(404).send('Seizure log not found');
    }
    patient.seizureLogs = patient.seizureLogs.filter(log => log.id !== logId);
    await patient.save();
    res.json(patient);
  } catch (error) {
    console.error('Error deleting seizure log:', error);
    res.status(500).send('Server error');
  }
});

// Export the router
module.exports = router;
