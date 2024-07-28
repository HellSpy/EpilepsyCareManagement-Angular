// backend/models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Patient', 'Doctor', 'Admin'], required: true },
  age: { type: Number },
  gender: { type: String },
  dateOfBirth: { type: Date },
  phoneNumber: { type: String },
  address: { type: String },
  primaryCarePhysician: { type: String },
  emergencyContact: {
    name: { type: String },
    relationship: { type: String },
    phone: { type: String }
  },
  knownAllergies: { type: String },
  previousSurgeries: { type: String },
  comorbidities: { type: String },
  epilepsyDetails: {
    diagnosisDate: { type: Date },
    medication: { type: String },
    medicationDosage: { type: String },
    medicationSideEffects: { type: String },
    lastSeizureDate: { type: Date },
    seizureType: { type: String },
    seizureTriggers: { type: String },
    seizureFrequency: { type: String },
    seizureDuration: { type: String },
    seizureAura: { type: String },
    responseToTreatment: { type: String },
    notes: { type: String },
    familyHistory: { type: String },
    allergies: { type: String },
    comorbidities: { type: String },
    VNS: { type: String }
  },
  lifestyle: {
    dietaryHabits: { type: String },
    exerciseRoutine: { type: String },
    sleepPatterns: { type: String },
    smokingAlcoholUse: { type: String }
  },
  supportResources: {
    supportGroups: { type: String },
    educationalMaterials: { type: String },
    carePlan: { type: String }
  }
});

module.exports = mongoose.model('User', UserSchema);
