// backend/models/MedicationDetails.js

// THIS SPECIFIES THE COLLECTION CALLED "MedicationDetails"
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicationDetailsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  sideEffects: { type: String },
  dosageInstructions: { type: String },
  brandNames: [String],
  interactions: { type: String },
  contraindications: { type: String },
  commonUses: { type: String }
});

module.exports = mongoose.model('MedicationDetails', MedicationDetailsSchema);
