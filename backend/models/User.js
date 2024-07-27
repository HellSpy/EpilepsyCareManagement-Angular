// backend/models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Patient', 'Doctor', 'Admin'], required: true },
  epilepsyDetails: {
    diagnosisDate: { type: Date },
    medication: { type: String },
    lastSeizureDate: { type: Date },
    notes: { type: String }
  }
});

module.exports = mongoose.model('User', UserSchema);
